var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('dummy', 'assets/dummy.png');
}

function create() {
    // add character and enable physics
    char = game.add.sprite(0, 0, 'dummy');
    game.physics.enable(char, Phaser.Physics.ARCADE);
    char.body.collideWorldBounds = true;

    // add alarm clock
    alarm_clock = game.add.sprite(800, 400, 'dummy');
    alarm_clock.tint = 0xff00ff;

    // cursors for movement
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    movement();

    updateAudioVolume();
}
