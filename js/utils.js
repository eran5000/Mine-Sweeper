'use strict'

var gElPrePressedButton = document.querySelector('.Easy')
gElPrePressedButton.style.backgroundColor = 'black'

function renderBoard(board,selector) {

    var strHTML = '<table class ="board-game" border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            var cell
            board[i][j].isMine ?  cell = MINE : cell = board[i][j].minesAroundCount
            const className = `cell cell-${i}-${j}`

            strHTML += `<td><button class="${className}" onclick="cellClicked(${i}, ${j})" oncontextmenu="cellMarked(${i}, ${j})">${cell}</button></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function changeDiff(size,mineNum,element){
    if(gGame.isOn){
        gLevel.SIZE = size
        gLevel.MINES = mineNum
        mineNum === 2 ? glifes = 1 : glifes = 3
        lifeRender() 
        diffButtonColor(element)
        gElMinesLeft.innerHTML = gLevel.MINES
        gBoard = buildBoard(gLevel)
        return gBoard
    }
}

function diffButtonColor(element){
    gElPrePressedButton.style.backgroundColor = 'white'
    var elButton = document.querySelector(element)
    elButton.style.backgroundColor = 'black'
    gElPrePressedButton = elButton
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function gGameReset(){
    gGame.markedCount = 0
    gGame.shownCount = 0
    gGame.secsPassed = 0
}



