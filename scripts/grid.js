/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

class Grid {
    constructor(gridSize, mines) {
        this.gridSize = gridSize;
        this.mines = mines;
        this.grid = document.getElementById("game-grid-container");
        this.grid.style.gridTemplateColumns = `repeat(${gridSize.x}, 40px)`;
        
        //sets minePositions array to a list of random x,y positions
        this.minePositions = (() => {
            let minePositions = [this.mines];
            for (let i=0; i < this.mines; i++) {
                const randomPosition = getRandomPosition(this.gridSize);
                while (arrayContains(minePositions, randomPosition)){
                    randomPosition = getRandomPosition(this.gridSize);
                }
                minePositions[i] = randomPosition;
            }
            return minePositions;
        })();

        this.cells = (() => {
            let cells = [];
            for (let y = 0; y < this.gridSize.y; y++)
                for (let x = 0; x < this.gridSize.x; x++) {
                    //sets up grid cell, which contains a button
                    const cell = new Cell(x, y, this);

                    //add button to game grid
                    this.grid.appendChild(cell.cellDiv);
                    //add cell to the grid's cells array
                    cells.push(cell);
                }
            return cells;
        })();
    }
    getCell(x, y) {
        let cell = null;
        this.cells.forEach(curCell => {
            if (curCell.position.x === x && curCell.position.y === y) {
                cell = curCell;
            }
        });
        return cell;
    }
    checkWin (){
        //checks if mine positions are all that's left
        let remainingClosedCells = 0;
        this.cells.forEach(cell => {
            remainingClosedCells += (!cell.isOpened);
        })
        if (remainingClosedCells <= this.minePositions.length) {
            this.win();
        }
    }
    win() {
        document.getElementById("message").textContent = "You Win!";
        this.cells.forEach(cell => {
            if (cell.checkForMine()) {
                cell.cellDiv.innerHTML = "";
                cell.cellDiv.style.backgroundImage = cell.mineImage;
            }

        });
    }
    lose() {
        //loop through all cells, reveal mines
        this.cells.forEach(cell => {
            cell.button.removeEventListener('click', cell.onLeftClick);
            if (cell.checkForMine()) {
                cell.cellDiv.innerHTML = "";
                cell.cellDiv.style.backgroundImage = cell.mineImage;
            }
        });
        
        document.getElementById("message").textContent = "You lose!";
    }

}
    