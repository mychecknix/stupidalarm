var game;
var box_size = 32;
var maze_rows;
var maze_cols;

window.onload = function ()
{
    var creditsHeight = document.getElementById('credits').scrollHeight;
    var containerHeight = document.getElementById('container').scrollHeight;

    var maxHeight = containerHeight - creditsHeight;
    var maxWidth = document.getElementById('container').scrollWidth;

    maze_cols = Math.floor(maxWidth / box_size);
    maze_rows = Math.floor(maxHeight / box_size);

    game = new Phaser.Game(maze_cols * box_size, maze_rows * box_size, Phaser.AUTO, "game");
    game.state.add("Boot", gameBoot);
    game.state.add("Preload", gamePreload);
    game.state.add("Menu", gameMenu);
    game.state.add("StupidAlarm", actualGame);
    game.state.add("GameOver", gameOver);
    game.state.start("Boot");
};
