'use strict'
const FLAG = '<img src="./Img/flag.png">'
const EMPTY = ' '
const FACESTART = '<img class="face" src="./Img/faceStart.png">'
const FACEWIN = '<img class="face" src="./Img/faceWin.png">'
const FACELOSE = '<img class="face" src="./Img/faceLose.png">'
const gElFace = document.querySelector('.faces')



var gLevel = { 
    SIZE: 4, 
    MINES: 2 
}

var gGame = { 
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
}
var gFirstClick
var gBoard
var gElGameOver = document.querySelector('.game-over') 
var gSize
var gElement
var hintInterval
setInterval(time,1000)

function initGame(size,mineNum,element){
    safeClicks = 3
    gElSafeClick.innerHTML = safeClicks
    gElFace.innerHTML = FACESTART
    isHintUse = false
    gHintUses = 3
    hintRender()
    gSize = size
    gMineNum = mineNum
    gElement = element
    gGame.isOn = true
    gFirstClick = false
    gGameReset()
    gElGameOver.style.display = 'none'
    gBoard = changeDiff(gSize,gMineNum,gElement)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '.board-container')
}

function buildBoard(level){
    var size = level.SIZE
    var mines = level.MINES
    var randNumMax = (size*size - 1)
    const board = []
    
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var num = getRandomIntInclusive(0,randNumMax)
            board[i][j] = {
                minesAroundCount: 0, 
                isShown: false, 
                isMine: false, 
                isMarked: false
            }
            if(num < mines && mines != 0){ 
                board[i][j].isMine = true
                mines--
                randNumMax--
            }else{  
                randNumMax--
            }

        }
    }
    return board

}

function cellClicked(row, col){
    if(!gGame.isOn) return
    if(!isHintUse){
        changeMineLoc(row,col)
        if(!gFirstClick) gFirstClick = true
        if(!gBoard[row][col].isMine){
            expandShown(row, col)
        }else{
            glifes--
            lifeRender()
            if(glifes === 0){
                gBoard[row][col].isShown = true
                var location = {i : row, j : col}
                renderCell(location, '<img src="Img/mine.png">')
                minesReveal()
                var cell = '.cell-' + row + '-' + col
                var elCell = document.querySelector(cell)
                elCell.style.backgroundColor = 'red'
            }
            else if(glifes > 0){
                var cell = '.cell-' + row + '-' + col
                var elCell = document.querySelector(cell)
                elCell.style.backgroundColor = 'red'
            }
            
        }
        checkGameOver()
    }else{
                    // 1.
        if(row > 0 && row < gBoard.length - 1 && col > 0 && col < gBoard[0].length - 1){
            hintShown(row - 1, row + 1, col - 1, col + 1)
                    // 2.
        }else if((row === 0 && col === 0 )){
            hintShown(row, row + 1, col, col + 1)
                    // 3.
        }else if(( row === 0 && col === gBoard[0].length - 1)){
            hintShown(row, row + 1, col - 1, col)
                    // 4.
        }else if(row === gBoard.length - 1 && col === gBoard[0].length - 1){
            hintShown(row - 1, row, col - 1, col)
                    // 5.
        }else if(row === gBoard.length - 1 && col === 0){
            hintShown(row - 1, row, col, col + 1)
                    // 6.
        }else if(row === 0  && (col > 0 || col < gBoard[0].length - 1)){
            hintShown(row, row + 1, col - 1, col + 1)
                    // 7.
        }else if(row === gBoard.length - 1 && (col > 0 || col < gBoard[0].length - 1)){
            hintShown(row - 1, row, col - 1, col + 1)
                    // 8.
        }else if(col === 0  && (row > 0 || row < gBoard.length - 1)){
            hintShown(row - 1, row + 1, col, col + 1)
                    // 9.
        }else if(col === gBoard[0].length - 1 && (row > 0 || row < gBoard.length - 1)){
            hintShown(row - 1, row + 1, col - 1, col)
        }
    }
}

function cellMarked(row,col){
    var elCell = document.querySelector('.cell-' + row + '-' + col)
    if(gGame.isOn){
        if(!gBoard[row][col].isMarked){
            elCell.innerHTML = FLAG
            gBoard[row][col].isMarked = true
            gGame.markedCount++
        }else{
            elCell.innerText = gBoard[row][col].minesAroundCount
            gBoard[row][col].isMarked = false
            gGame.markedCount--
        }
        checkGameOver()
    }
}

function checkGameOver(){
    for(var i = 0 ; i < gBoard.length;i++){
        for(var j = 0; j<gBoard[0].length;j++){
            if(gBoard[i][j].isShown === true && gBoard[i][j].isMine === true){
                gElFace.innerHTML = FACELOSE
                gGame.isOn = false
                gElGameOver.innerHTML = `you lost!<br> <button class="new-game" onclick="initGame(gSize,gMineNum,gElement)">new game</button>`
                gElGameOver.style.display = 'block'
            }
        }
    }   
    if(gGame.shownCount + gGame.markedCount === gLevel.SIZE * gLevel.SIZE){
        gElFace.innerHTML = FACEWIN
        gGame.isOn = false
        gElGameOver.innerHTML = `you won<br> <button class="new-game" onclick="initGame(gSize,gMineNum,gElement)">new game</button>`
        gElGameOver.style.display = 'block'
    }

}

function time(){
    var elTime = document.getElementById("time")
    if(!gFirstClick) elTime.innerHTML = 0
    if(!gGame.isOn) elTime.innerHTML = gGame.secsPassed
    if(gFirstClick && gGame.isOn){
        elTime.innerHTML = gGame.secsPassed
        gGame.secsPassed++
    }
}

function expandShown(row, col) {
    var elCell
    var cell
    if (row < 0 || row > gBoard.length - 1 || col < 0 || col > gBoard[0].length - 1) return;
    if(gBoard[row][col].minesAroundCount > 0 && !gBoard[row][col].isShown){
        gBoard[row][col].isShown = true;
        cell = '.cell-' + row + '-' + col
        elCell = document.querySelector(cell)
        gGame.shownCount++
        elCell.style.backgroundColor = 'grey'
        elCell.style.color = 'white'
    }
    if ( gBoard[row][col].minesAroundCount === EMPTY && !gBoard[row][col].isShown) {
        gBoard[row][col].isShown = true;
        cell = '.cell-' + row + '-' + col
        elCell = document.querySelector(cell)
        gGame.shownCount++
        elCell.style.backgroundColor = 'grey'
        elCell.style.color = 'white'
        expandShown( row+1, col );
        expandShown( row-1, col );
        expandShown( row, col-1 );
        expandShown( row, col+1 );
    } else {
        return;
    }
}




 
