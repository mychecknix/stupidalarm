/**
 * coordinate the movement of the character
 */
function movement() {
    game.physics.arcade.collide(char, layer);

    // reset character movement
    char.body.velocity.x = 0;
    char.body.velocity.y = 0;

    // character movement
    if (cursors.left.isDown) {
        char.body.velocity.x = -150;
        char.animations.play('left');
    }
    else if (cursors.right.isDown) {
        char.body.velocity.x = 150;
        char.animations.play('right');
    }
    if (cursors.up.isDown) {
        char.body.velocity.y = -150;
        char.animations.play('up');
    }
    else if (cursors.down.isDown) {
        char.body.velocity.y = 150;
        char.animations.play('down');
    } else {
        char.animations.stop('left');
        char.animations.stop('right');
        char.animations.stop('up');
        char.animations.stop('down');
    }

    mask.position = char.position;
}
