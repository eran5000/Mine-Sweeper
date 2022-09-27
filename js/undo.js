var movesArr = []

function undo(){
    var elCell
    var cell
    var move = movesArr.length - 1
    if(gGame.isOn && movesArr.length > 0){
        for(var i = 0; i < movesArr[move].length; i++){
            cell = '.cell-' + movesArr[move][i].row + '-' + movesArr[move][i].col
            elCell = document.querySelector(cell)
            if(movesArr[move][i].change === 'shown'){
                gBoard[movesArr[move][i].row][movesArr[move][i].col].isShown = false
                gGame.shownCount--
                elCell.style.backgroundColor = 'white'
                elCell.style.color = 'white'
            }else if(movesArr[move][i].change === 'mark'){
                elCell.innerHTML = gBoard[movesArr[move][i].row][movesArr[move][i].col].minesAroundCount
                gBoard[movesArr[move][i].row][movesArr[move][i].col].isMarked = false
            }else if(movesArr[move][i].change === 'unmark'){
                elCell.innerHTML = FLAG
                gBoard[movesArr[move][i].row][movesArr[move][i].col].isMarked = true
            }
            // }else if(movesArr[move][i].change === 'lifeLost'){
            //     elCell.style.backgroundColor = 'white'
            // }

        }
        movesArr.splice(move,1)
    }
}