var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', {preload: preload, create: create, update: update});

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
    // reset character movement
    char.body.velocity.x = 0;
    char.body.velocity.y = 0;

    // character movement
    if (cursors.left.isDown) {
        char.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
        char.body.velocity.x = 150;
    }
    if (cursors.up.isDown) {
        char.body.velocity.y = -150;
    }
    else if (cursors.down.isDown) {
        char.body.velocity.y = 150;
    }
}
