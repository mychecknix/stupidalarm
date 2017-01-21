var MAZE_WALL = 'wall';
var MAZE_FLOOR = 'floor';
var MAZE_UNVISITED = 'unvisited';

function maze_generator(width, height) {
    // Randomized Prim's algorithm
    // see https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim.27s_algorithm
    var maze = [];
    var walls = [];

    // Step 1: Start with a grid full of walls.
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            maze[i][j] = MAZE_UNVISITED;
        }
    }

    // Step 2: Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
    var cellX = get_random_int(0, width - 1);
    var cellY = get_random_int(0, height - 1);
    maze[cellX][cellY] = MAZE_FLOOR;

    // wall to the right (x + 1, y)
    if (typeof maze[cellX + 1][cellY] !== 'undefined' && maze[cellX + 1][cellY] === 1) {
        walls.push([[cellX, cellY], [cellX + 1, cellY]]);
    }
    // wall to the left (x - 1, y)
    else if (typeof maze[cellX - 1][cellY] !== 'undefined' && maze[cellX - 1][cellY] === 1) {
        walls.push([[cellX, cellY], [cellX - 1, cellY]]);
    }
    // wall to the top (x, y + 1)
    else if (typeof maze[cellX][cellY + 1] !== 'undefined' && maze[cellX][cellY + 1] === 1) {
        walls.push([[cellX, cellY], [cellX, cellY + 1]]);
    }
    // wall to the bottom (x, y - 1)
    else if (typeof maze[cellX][cellY - 1] !== 'undefined' && maze[cellX][cellY - 1] === 1) {
        walls.push([[cellX, cellY], [cellX, cellY - 1]]);
    }

    // Step 3: While there are walls in the list
    while (walls.length > 0) {
        // Step 3.1: Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then
        var wall_id = get_random_int(0, walls.length - 1);
        var wall = walls[wall_id];

        var cellA = maze[wall[0][0]][wall[0][1]];
        var cellB = maze[wall[1][0]][wall[1][1]];
        if (
            (cellA === MAZE_UNVISITED && cellB !== MAZE_UNVISITED)
            || (cellA !== MAZE_UNVISITED && cellA === MAZE_UNVISITED)
        ) {
            // Step 3.1.1: Make the wall a passage and mark the unvisited cell as part of the maze
            // Step 3.1.2: Add the neighboring walls of the cell to the wall list
        }

        // Step 3.2: Remove the wall from the list
    }

    return maze;
}

/**
 * returns a random number from min (inclusive) to max (inclusive)
 *
 * @param min
 * @param max
 */
function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}