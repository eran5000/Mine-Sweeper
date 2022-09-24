'use strict'
const MINE = 'M'

var gElMinesLeft = document.getElementById('minesLeft')
var gMineNum

function changeMineLoc(row,col){
    if(!gFirstClick){
        if(gBoard[row][col].isMine){
            initGame(gSize,gMineNum,gElement)
            changeMineLoc(row,col)
        }
    }
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

function minesInArea(board, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd){
    var mineInArea = 0

    for(var i = rowIdxStart; i <= rowIdxEnd; i++){
        for(var j = colIdxStart; j <= colIdxEnd ; j++){
            if(board[i][j].isMine) mineInArea++
        }
    }
    if(mineInArea === 0) mineInArea = EMPTY
    return mineInArea
}

function minesReveal(){
    for(var i = 0; i < gBoard.length;i++){
        for(var j = 0; j < gBoard[0].length; j++){
            if(gBoard[i][j].isMine){
                var location = {i : i, j : j}
                renderCell(location, '<img src="Img/mine.png">')
            } 
        }
    }
}
