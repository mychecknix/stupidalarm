var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
var alarm;
var alarmClock;
var mask;
var maxDistance;
var map;
var layer;
var mazeWidth = 32;
var mazeHeight = 18;
var maze;
var char;
var cursors;
var boxSize = 32;

function preload() {
    game.load.image('dummy', 'assets/dummy.png');
    game.load.spritesheet('character', 'assets/character_sprite.png', 16, 32, 8);
    game.load.audio('alarm', 'assets/Kevin_MacLeod_-_Monkeys_Spinning_Monkeys.mp3');
    game.load.image('tiles', 'assets/tiles.png');
}

function create() {
    maze = maze_generator(mazeWidth, mazeHeight);
    log_maze(maze);
    game.load.tilemap('maze', null, get_csv_from_array(maze.maze), Phaser.Tilemap.CSV);
    map = game.add.tilemap('maze');
    map.addTilesetImage('Maze', 'tiles');
    layer = map.createLayer(0);

    map.setCollisionByExclusion([0]);

    // add character and enable physics
    char = game.add.sprite(maze.startCell.x * boxSize, maze.startCell.y * boxSize, 'character', 1);
    game.physics.enable(char, Phaser.Physics.ARCADE);
    char.body.collideWorldBounds = true;

    // cursors for movement
    cursors = game.input.keyboard.createCursorKeys();

    add_alarm_clock(maze.lastCell.x * boxSize, maze.lastCell.y * boxSize);
    maxDistance = calc_max_distance();

    // mask
    mask = game.add.graphics(0, 0);
    mask.beginFill(0xffffff, 1);
    mask.drawCircle(8, 16, 150);
    layer.mask = mask;
}

function update() {
    game.physics.arcade.collide(char, layer);

    movement();

    mask.position = char.position;

    update_audio_volume();
}