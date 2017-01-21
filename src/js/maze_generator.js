var MAZE_WALL = '*';
var MAZE_FLOOR = '.';

/**
 * generates a maze
 *
 * @param width
 * @param height
 * @returns {Array}
 */
function maze_generator(width, height) {
    // Randomized Prim's algorithm
    // see https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim.27s_algorithm
    var maze = [];
    var walls = [];

    // Step 1: Start with a grid full of walls.
    for (var i = 0; i < width; i++) {
        if (typeof maze[i] === 'undefined') {
            maze[i] = [];
        }
        for (var j = 0; j < height; j++) {
            maze[i][j] = MAZE_WALL;
        }
    }

    // Step 2: Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
    var startCellX = get_random_int(0, width - 1);
    var startCellY = get_random_int(0, height - 1);
    // startCellX = 0;
    // startCellY = 0;
    maze[startCellX][startCellY] = MAZE_FLOOR;

    for (i = -1; i <= 1; i++) {
        if (typeof maze[startCellX + i] !== 'undefined') {
            for (j = -1; j <= 1; j++) {
                if (
                    (i === 0 && j === 0)
                    || (i !== 0 && j !== 0)
                    || typeof maze[startCellX + i][startCellY + j] === 'undefined'
                    || maze[startCellX + i][startCellY + j] === MAZE_FLOOR
                ) {
                    continue;
                }

                walls.push([[startCellX, startCellY], [startCellX + i, startCellY + j]]);
            }
        }
    }

    // Step 3: While there are walls in the list
    var lastCellX, lastCellY;
    while (walls.length > 0) {
        // Step 3.1: Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then
        var wall_id = get_random_int(0, walls.length - 1);
        var wall = walls[wall_id];

        var cellFloorX = wall[0][0];
        var cellFloorY = wall[0][1];
        var cellWallX = wall[1][0];
        var cellWallY = wall[1][1];

        var cellOppositeX, cellOppositeY;
        if (cellFloorX === cellWallX) {
            cellOppositeX = cellFloorX;
            cellOppositeY = cellWallY + (cellWallY - cellFloorY);
        }
        else if (cellFloorY === cellWallY) {
            cellOppositeX = cellWallX + (cellWallX - cellFloorX);
            cellOppositeY = cellFloorY;
        }

        if (typeof maze[cellOppositeX] !== 'undefined' && typeof maze[cellOppositeX][cellOppositeY] !== 'undefined') {
            var cellOpposite = maze[cellOppositeX][cellOppositeY];
            if (
                (maze[cellFloorX][cellFloorY] === MAZE_FLOOR && cellOpposite === MAZE_WALL)
                || (maze[cellFloorX][cellFloorY] === MAZE_WALL && cellOpposite === MAZE_FLOOR)
            ) {
                // Step 3.1.1: Make the wall a passage and mark the unvisited cell as part of the maze
                maze[cellWallX][cellWallY] = MAZE_FLOOR;
                maze[cellOppositeX][cellOppositeY] = MAZE_FLOOR;
                lastCellX = cellOppositeX;
                lastCellY = cellOppositeY;

                // Step 3.1.2: Add the neighboring walls of the cell to the wall list
                for (i = -1; i <= 1; i++) {
                    if (typeof maze[cellOppositeX + i] !== 'undefined') {
                        for (j = -1; j <= 1; j++) {
                            if (
                                (i === 0 && j === 0)
                                || (i !== 0 && j !== 0)
                                || typeof maze[cellOppositeX + i][cellOppositeY + j] === 'undefined'
                                || maze[cellOppositeX + i][cellOppositeY + j] === MAZE_FLOOR
                            ) {
                                continue;
                            }

                            walls.push([[cellOppositeX, cellOppositeY], [cellOppositeX + i, cellOppositeY + j]]);
                        }
                    }
                }
            }
        }

        // Step 3.2: Remove the wall from the list
        walls.splice(wall_id, 1);
    }

    return {
        startCell: [startCellX, startCellY],
        lastCell: [lastCellX, lastCellY],
        maze: maze
    };
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
