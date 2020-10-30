/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

window.onload = function () {

    const GRID_SIZE_MAX = { 'x': 30, 'y': 20 };
    const GAME_FRAME = document.getElementById("game-frame");
    const SUBMIT_OPTIONS = document.getElementById("submit-options");
    const GAME_GRID = document.getElementById("game-grid-container");
    const MESSAGE = document.getElementById("message");

    let gridSize = {};
    let max_mines = 0;
    let mines = 0;
    let grid;

    function initializeGrid() {
        //remove all children of grid
        //credit to Gabriel-Mcadams on stackoverflow https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        while (GAME_GRID.firstChild) {
            GAME_GRID.removeChild(GAME_GRID.firstChild);
        }

        gridSize = {
            "x": Math.min(document.getElementById("grid-size-x-input").value, GRID_SIZE_MAX.x),
            "y": Math.min(document.getElementById("grid-size-y-input").value, GRID_SIZE_MAX.y)
        };
        max_mines = gridSize.x * gridSize.y; //there can't be more mines than spaces
        mines = Math.min(document.getElementById("mine-amount-input").value, max_mines);
        GAME_FRAME.style.width = gridSize.x * 40;
        MESSAGE.textContent = "";

        grid = new Grid(gridSize, mines);
    }

    initializeGrid();

    //restart game on submit button
    SUBMIT_OPTIONS.addEventListener('click', function () {
        initializeGrid();
    
    }, false);

}