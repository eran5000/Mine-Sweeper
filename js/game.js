'use strict'
const MINE = 'M'
const FLAG = '<img src="img/flag.png">'
const LIFE = '<img src="img/life.png">'
const EMPTY = ' '


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

var gFirstClick = false
var gBoard
var gElGameOver = document.querySelector('.game-over')
var gElMinesLeft = document.getElementById('minesLeft')
var gElLife = document.getElementById("lifesLeft")
var gTimeInterval = setInterval(time,1000)
var glifes = 0

function initGame(size,mineNum,element){
    gGame.isOn = true
    gFirstClick = false
    gGame.secsPassed = 0
    gElGameOver.style.display = 'none'
    gBoard = changeDiff(size,mineNum,element)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '.board-container')
    gTimeInterval
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

function setMinesNegsCount(board){
    var minesCount
    renderBoard(board, '.board-container')
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[0].length; j++){
            if(!board[i][j].isMine){
                // 1.
                if(i > 0 && i < board.length - 1 && j > 0 && j < board[0].length - 1){
                    minesCount = minesInArea(board, i - 1, i + 1, j - 1, j + 1)
                    gBoard[i][j].minesAroundCount = minesCount
                // 2.
                }else if((i === 0 && j === 0 )){
                    minesCount = minesInArea(board, i, i + 1, j, j + 1)
                    gBoard[i][j].minesAroundCount = minesCount
                // 3.
                }else if(( i === 0 && j === board[0].length - 1)){
                    minesCount = minesInArea(board, i, i + 1, j - 1, j)
                    gBoard[i][j].minesAroundCount = minesCount
                // 4.
                }else if(i === board.length - 1 && j === board[0].length - 1){
                    minesCount = minesInArea(board, i - 1, i, j - 1, j)
                    gBoard[i][j].minesAroundCount = minesCount
                // 5.
                }else if(i === board.length - 1 && j === 0){
                    minesCount = minesInArea(board, i - 1, i, j, j + 1)
                    gBoard[i][j].minesAroundCount = minesCount
                // 6.
                }else if(i === 0  && (j > 0 || j < board[0].length - 1)){
                    minesCount = minesInArea(board, i, i + 1, j - 1, j + 1)
                    gBoard[i][j].minesAroundCount = minesCount
                // 7.
                }else if(i === board.length - 1 && (j > 0 || j < board[0].length - 1)){
                    minesCount = minesInArea(board, i - 1, i, j - 1, j + 1)
                    gBoard[i][j].minesAroundCount = minesCount
                // 8.
                }else if(j === 0  && (i > 0 || i < board.length - 1)){
                    minesCount = minesInArea(board, i - 1, i + 1, j, j + 1)
                    gBoard[i][j].minesAroundCount = minesCount
                // 9.
                }else if(j === board[0].length - 1 && (i > 0 || i < board.length - 1)){
                    minesCount = minesInArea(board, i - 1, i + 1, j - 1, j)
                    gBoard[i][j].minesAroundCount = minesCount
                }
            }
        }
    }
}

function cellClicked(row, col){
    if(!gGame.isOn) return
    if(!gFirstClick) gFirstClick = true
    if(!gBoard[row][col].isMine){
        // 1.
        if(row > 0 && row < gBoard.length - 1 && col > 0 && col < gBoard[0].length - 1){
            expandShown(row - 1, row + 1, col - 1, col + 1)
        // 2.
        }else if((row === 0 && col === 0 )){
            expandShown(row, row + 1, col, col + 1)
        // 3.
        }else if(( row === 0 && col === gBoard[0].length - 1)){
            expandShown(row, row + 1, col - 1, col)
        // 4.
        }else if(row === gBoard.length - 1 && col === gBoard[0].length - 1){
            expandShown(row - 1, row, col - 1, col)
        // 5.
        }else if(row === gBoard.length - 1 && col === 0){
            expandShown(row - 1, row, col, col + 1)
        // 6.
        }else if(row === 0  && (col > 0 || col < gBoard[0].length - 1)){
            expandShown(row, row + 1, col - 1, col + 1)
        // 7.
        }else if(row === gBoard.length - 1 && (col > 0 || col < gBoard[0].length - 1)){
            expandShown(row - 1, row, col - 1, col + 1)
        // 8.
        }else if(col === 0  && (row > 0 || row < gBoard.length - 1)){
            expandShown(row - 1, row + 1, col, col + 1)
        // 9.
        }else if(col === gBoard[0].length - 1 && (row > 0 || row < gBoard.length - 1)){
            expandShown(row - 1, row + 1, col - 1, col)
        }
    }else{
        glifes--
        gElLife.innerHTML = glifes
        if(glifes === 0){
            gBoard[row][col].isShown = true
            var location = {i : row, j : col}
            renderCell(location, '<img src="Img/mine.png">')
            var cell = '.cell-' + row + '-' + col
            var elCell = document.querySelector(cell)
            elCell.style.backgroundColor = 'red'
        }
        
    }
    checkGameOver()
}

function cellMarked(row,col){
    var elCell = document.querySelector('.cell-' + row + '-' + col)
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

function checkGameOver(){
    for(var i = 0 ; i < gBoard.length;i++){
        for(var j = 0; j<gBoard[0].length;j++){
            if(gBoard[i][j].isShown === true && gBoard[i][j].isMine === true){
                gGame.isOn = false
                clearInterval(gTimeInterval)
                gElGameOver.innerHTML = `you lost!<br> <button class="new-game" onclick="initGame(4,2,'.Easy')">new game</button>`
                gElGameOver.style.display = 'block'
            }
        }
    }   
    if(gGame.shownCount + gLevel.MINES === gLevel.SIZE *gLevel.SIZE && gGame.markedCount === gLevel.MINES){
        gGame.isOn = false
        clearInterval(gTimeInterval)
        gElGameOver.innerHTML = `you won<br> <button class="new-game" onclick="initGame(4,2,'.Easy')">new game</button>`
        gElGameOver.style.display = 'block'
    }

}

function expandShown(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd){
    var elCell
    var cell
    for(var i = rowIdxStart; i <= rowIdxEnd; i++){
        for(var j = colIdxStart; j <= colIdxEnd ; j++){
            cell = '.cell-' + i + '-' + j
            elCell = document.querySelector(cell)
            if(!gBoard[i][j].isMine && elCell.style.backgroundColor != 'grey'){
                gGame.shownCount++
                elCell.style.backgroundColor = 'grey'
                elCell.style.color = 'white'
                gBoard[i][j].isShown = true
            }
        }
    }
}

function time(){
    var elTime = document.getElementById("time")
    if(gFirstClick && gGame.isOn){
        elTime.innerHTML = gGame.secsPassed
        gGame.secsPassed++
    }
}
 