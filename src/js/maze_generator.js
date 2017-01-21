var MAZE_WALL = 1;
var MAZE_FLOOR = 0;

/**
 * generates a maze
 *
 * @param width
 * @param height
 * @returns {object}
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
    var startCell = {
        x: get_random_int(0, width - 1),
        y: get_random_int(0, height - 1)
    };
    maze[startCell.x][startCell.y] = MAZE_FLOOR;

    for (i = -1; i <= 1; i++) {
        if (typeof maze[startCell.x + i] !== 'undefined') {
            for (j = -1; j <= 1; j++) {
                if (
                    (i === 0 && j === 0)
                    || (i !== 0 && j !== 0)
                    || typeof maze[startCell.x + i][startCell.y + j] === 'undefined'
                    || maze[startCell.x + i][startCell.y + j] === MAZE_FLOOR
                ) {
                    continue;
                }

                walls.push({ floor: { x: startCell.x, y: startCell.y }, wall: { x: startCell.x + i, y: startCell.y + j } });
            }
        }
    }

    // Step 3: While there are walls in the list
    var lastCell = {
        x: startCell.x,
        y: startCell.y
    };
    while (walls.length > 0) {
        // Step 3.1: Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then
        var wall_id = get_random_int(0, walls.length - 1);
        var wall = walls[wall_id];

        var cellOppositeX, cellOppositeY;
        if (wall.floor.x === wall.wall.x) {
            cellOppositeX = wall.floor.x;
            cellOppositeY = wall.wall.y + (wall.wall.y - wall.floor.y);
        }
        else if (wall.floor.y === wall.wall.y) {
            cellOppositeX = wall.wall.x + (wall.wall.x - wall.floor.x);
            cellOppositeY = wall.floor.y;
        }

        if (typeof maze[cellOppositeX] !== 'undefined' && typeof maze[cellOppositeX][cellOppositeY] !== 'undefined') {
            var cellOpposite = maze[cellOppositeX][cellOppositeY];
            if (
                (maze[wall.floor.x][wall.floor.y] === MAZE_FLOOR && cellOpposite === MAZE_WALL)
                || (maze[wall.floor.x][wall.floor.y] === MAZE_WALL && cellOpposite === MAZE_FLOOR)
            ) {
                // Step 3.1.1: Make the wall a passage and mark the unvisited cell as part of the maze
                maze[wall.wall.x][wall.wall.y] = MAZE_FLOOR;
                maze[cellOppositeX][cellOppositeY] = MAZE_FLOOR;
                lastCell.x = cellOppositeX;
                lastCell.y = cellOppositeY;

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

                            walls.push({ floor: { x: cellOppositeX, y: cellOppositeY }, wall: { x: cellOppositeX + i, y: cellOppositeY + j } });

                        }
                    }
                }
            }
        }

        // Step 3.2: Remove the wall from the list
        walls.splice(wall_id, 1);
    }

    return {
        startCell: startCell,
        lastCell: lastCell,
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

/**
 * log the maze to the console
 *
 * @param maze
 */
function log_maze(maze) {
    var out = '';
    for (var i = 0; i < maze.maze[0].length; i++) {
        for (var j = 0; j < maze.maze.length; j++) {
            out = out + maze.maze[j][i];
        }
        out = out + "\n";
    }
    console.log(out);
    console.log('start: ' + maze.startCell.x + ', ' + maze.startCell.y);
    console.log('end: ' + maze.lastCell.x + ', ' + maze.lastCell.y);
}

/**
 * generate csv from an array
 *
 * @param array
 * @returns {string}
 */
function get_csv_from_array(array) {
    var csv = "";
    var line = "";
    for (var i = 0; i < array[0].length; i++) {
        line = "";
        for (var j = 0; j < array.length; j++) {
            if (line === "") {
                line = array[j][i];
            }
            else {
                line = line + "," + array[j][i];
            }
        }
        csv = csv + line + "\n";
    }

    return csv;
}