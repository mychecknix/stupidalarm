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

    // add alarm clock and play music
    alarmClock = game.add.sprite(800, 400, 'dummy');
    alarmClock.tint = 0xff00ff;
    alarm = game.add.audio('alarm');
    alarm.play();

    // cursors for movement
    cursors = game.input.keyboard.createCursorKeys();

    // max distance for audio
    maxDistance = Phaser.Math.distance(0, 0, game.width, game.height);
}

function update() {
    movement();

    updateAudioVolume();
}
