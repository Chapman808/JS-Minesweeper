/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

class Cell {
    constructor(xIndex, yIndex, grid) {

        //images
        const buttonDefaultImage = "url('images/button.png')";
        const flagImage = "url('images/flag.png')";
        this.mineImage = "url('images/mine.png')";


        this.position = { 'x': xIndex, 'y': yIndex };
        this.isOpened = false;
        this.isFlagged = false;

        //HTML elements
        this.cellDiv = document.createElement("DIV");
        this.cellDiv.id = `${xIndex} ${yIndex}`;
        this.cellDiv.className = 'game-grid-cell';
        this.grid = grid; //parent of grid cell
        this.button = document.createElement("DIV");
        this.button.parent = this;
        this.button.className = 'game-grid-button';

        this.cellDiv.appendChild(this.button);

        ///////////////////////////////////
        // Cell Event Listeners
        ///////////////////////////////////

        this.onLeftClick = ((event) => {
            //const cell = this.parent; //grabs cell
            if (!this.isFlagged)
                this.onCellClick();
        });

        //on left click
        this.button.addEventListener('click', this.onLeftClick, false);



        //on right click
        this.button.addEventListener('contextmenu', onRightClick, false);

        function onRightClick (event){
            event.preventDefault();
            const cell = this.parent; //grabs cell
            cell.isFlagged = !cell.isFlagged;
            if (cell.isFlagged) this.style.backgroundImage = flagImage;
            else this.style.backgroundImage = buttonDefaultImage;
        }

    }
    ///////////////////////////////////////////////
    // Methods
    ///////////////////////////////////////////////
    //manages clicks on cell. Calls checkForMine and returns result. ends game if mine is found at clicked position. 
    onCellClick (){
        this.isOpened = true;
        if (this.checkForMine()) {
            this.cellDiv.style.backgroundImage = this.mineImage;
            this.grid.lose();
            return;
        }

        //updates cell text with its weight (number of neighbor mines)
        this.cellDiv.innerHTML = this.getCellWeight();

        //if this cell has a weight of zero, 'open' all neighbor cells. Propogate this behavior recursively to all adjacent neighbors that are not open.
        this.propogateZeroWeight();
        //check for win
        this.grid.checkWin();
    }

    //checks each mine position to see if the cell has a mine under it. returns Boolean
    checkForMine() {
        let mineFound = false;
        this.grid.minePositions.forEach(minePos => {
            if (minePos[0] === this.position.x && minePos[1] === this.position.y) {
                mineFound = true;
            }
        });
        return mineFound;
    }

    //returns 'weight' of cell, the number of adjacent mines (in the eight 'neighbor' cells)
    getCellWeight() {
        let weight = 0;
        this.getNeighborCells().forEach(neighbor => {
            weight += neighbor.checkForMine();
        });
        return weight;
    }

    //gets neighbor cells (nine adjacent) from position within grid limits
    getNeighborCells() {
        function _addNeighbor(grid, neighbors, x, y) {
            const neighbor = grid.getCell(x, y);
            if (neighbor === null)
                return neighbors;
            else
                return neighbors.push(neighbor);
        }

        let neighbors = [];
        const x = this.position.x;
        const y = this.position.y;

        //iterates through plus or minus one of the cell's position to find the (up to) eight adjacent neighbors
        for (let xI = x - 1; xI < x + 2; xI++)
            for (let yI = y - 1; yI < y + 2; yI++) {
                //skip over the cell who called the function
                if (xI === x && yI === y)
                    continue;
                _addNeighbor(this.grid, neighbors, xI, yI);
            }
        return neighbors;
    }

    //if the cell or any neighbors have a weight of zero, remove the cell. propogate this behavior to all neighbors.
    propogateZeroWeight() {
        //if the cell has weight of zero, 'open' all adjacent neighbors.
        if (this.getCellWeight() === 0) {
            this.cellDiv.innerHTML = "";
            this.isOpened = true;

            //for each neighbor cell, open it if it isn't already open. If it hasn't, propogate to neighbors.
            //setTimeout is for effect.
            setTimeout(() => this.getNeighborCells().forEach(neighbor => {
                if (!neighbor.isOpened && !neighbor.isFlagged) {
                    neighbor.cellDiv.innerHTML = neighbor.getCellWeight(); //opens cell and sets inner HTML to weight
                    neighbor.isOpened = true;
                    neighbor.propogateZeroWeight();
                }
            }), 10);
            this.grid.checkWin();
            return;
        }
    }
    
    
}
