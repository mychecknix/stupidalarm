/**
 * coordinate the movement of the character
 */
function movement() {
    game.physics.arcade.collide(char, layer);

    // character movement
    if (cursors.left.isDown) {
        char.body.velocity.x = -150;
        char.animations.play('left');
    }
    else if (cursors.right.isDown) {
        char.body.velocity.x = 150;
        char.animations.play('right');
    }
    else {
        char.body.velocity.x = 0;
        char.animations.stop('left');
        char.animations.stop('right');
    }

    if (cursors.up.isDown) {
        char.body.velocity.y = -150;
        char.animations.play('up');
    }
    else if (cursors.down.isDown) {
        char.body.velocity.y = 150;
        char.animations.play('down');
    }
    else {
        char.body.velocity.y = 0;
        char.animations.stop('up');
        char.animations.stop('down');
    }

    mask.position = char.position;
}
