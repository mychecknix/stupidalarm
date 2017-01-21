function movement() {
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

function updateAudioVolume() {
    max_distance = Phaser.Math.distance(0, 0, game.width, game.height)
    distance = game.physics.arcade.distanceBetween(char, alarm_clock);
}