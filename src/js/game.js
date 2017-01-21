var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
var alarm;
var maxDistance;

function preload() {
    game.load.image('dummy', 'assets/dummy.png');
    game.load.audio('alarm', 'assets/Kevin_MacLeod_-_Monkeys_Spinning_Monkeys.mp3');
}

function create() {
    // add character and enable physics
    char = game.add.sprite(0, 0, 'dummy');
    game.physics.enable(char, Phaser.Physics.ARCADE);
    char.body.collideWorldBounds = true;

    // cursors for movement
    cursors = game.input.keyboard.createCursorKeys();

    add_alarm_clock();
    maxDistance = calc_max_distance();
}

function update() {
    movement();

    updateAudioVolume();
}
