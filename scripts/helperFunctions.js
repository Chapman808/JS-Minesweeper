/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

function arrayContains (a, val){
    for (i=a.length-1;a>-0;a--){
        if (a[i] === val) return true;
    }
    return false;
}

//returns array of random x,y positions (x,y arrays) within grid boundaries
function getRandomPosition (gridSize){
    function getRandomInt (min, max) {
        return (Math.floor(Math.random() * (max - min) + min));
    }
    const x = getRandomInt (0, gridSize.x)
    const y = getRandomInt (0, gridSize.y)

    return [x,y];
}

function cellExists (position, grid) {
    let exists = false;
    grid.cells.forEach (cell => {
        if (cell.position === position) exists = true;
    })
    return exists;
}