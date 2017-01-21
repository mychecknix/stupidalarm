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

function preload() {
    game.load.image('dummy', 'assets/dummy.png');
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

    //TODO adding one tile makes the collision work...??
    map.putTile(1, 32, 32, layer);
    map.setCollisionByExclusion([0]);

    // add character and enable physics
    char = game.add.sprite(0, 0, 'dummy');
    game.physics.enable(char, Phaser.Physics.ARCADE);
    char.body.collideWorldBounds = true;

    // cursors for movement
    cursors = game.input.keyboard.createCursorKeys();

    add_alarm_clock();
    maxDistance = calc_max_distance();

    // mask
    mask = game.add.graphics(0,0);
    mask.beginFill(0xffffff);
    mask.drawCircle(char.position.x, char.position.y, 150);
    layer.mask = mask;
}

function update() {
    game.physics.arcade.collide(char, layer);

    movement();

    mask.position.x = char.position.x + 16;
    mask.position.y = char.position.y + 16;

    update_audio_volume();
}
