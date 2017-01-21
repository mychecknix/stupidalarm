var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
var alarm;
var alarmClock;
var mask;
var maxDistance;
var map;
var layer;
var MAZE_WIDTH = 32;
var MAZE_HEIGHT = 18;
var maze;
var char;
var cursors;
var BOX_SIZE = 32;
var CHARACTER_FRAME_RATE = 5;

function preload() {
    //game.load.image('dummy', 'assets/clock.png');
    game.load.spritesheet('character', 'assets/character_sprite.png', 16, 32, 8);
    game.load.audio('alarm', 'assets/Kevin_MacLeod_-_Monkeys_Spinning_Monkeys.mp3');
    game.load.image('tiles', 'assets/tiles.png');
}

function create() {
    // generate and add maze
    maze = maze_generator(MAZE_WIDTH, MAZE_HEIGHT);
    game.load.tilemap('maze', null, get_csv_from_array(maze.maze), Phaser.Tilemap.CSV);
    map = game.add.tilemap('maze');
    map.addTilesetImage('Maze', 'tiles');
    layer = map.createLayer(0);
    map.setCollisionByExclusion([MAZE_FLOOR]);

    // add character and enable physics
    char = game.add.sprite(maze.startCell.x * BOX_SIZE + 8, maze.startCell.y * BOX_SIZE, 'character', 1);
    game.physics.enable(char, Phaser.Physics.ARCADE);
    char.body.collideWorldBounds = true;

    // add animation to character
    char.animations.add('up', [1, 5], CHARACTER_FRAME_RATE, true);
    char.animations.add('down', [0, 4], CHARACTER_FRAME_RATE, true);
    char.animations.add('left', [2, 6], CHARACTER_FRAME_RATE, true);
    char.animations.add('right', [3, 7], CHARACTER_FRAME_RATE, true);

    // cursors for movement
    cursors = game.input.keyboard.createCursorKeys();

    // add alarm clock
    add_alarm_clock();
    maxDistance = calc_max_distance(maze.lastCell.x * BOX_SIZE, maze.lastCell.y * BOX_SIZE);

    // add mask around character
    mask = game.add.graphics(0, 0);
    mask.beginFill(0xffffff, 1);
    mask.drawCircle(8, 16, 150);
    layer.mask = mask;
}

function update() {
    movement();

    update_audio_volume();
}