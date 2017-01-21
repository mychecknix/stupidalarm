//character frame after a new key
var charpointer = 1;

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
    }
    else if (cursors.right.isDown) {
        char.body.velocity.x = 150;
    }
    if (cursors.up.isDown) {
        char.body.velocity.y = -150;
    }
    else if (cursors.down.isDown) {
        char.body.velocity.y = 150;
        if ((charpointer % 4) !== 1){
            char.frame = 5;
            charpointer = 1;
        }
        char.frame = (char.frame + 4) % 8;
    }

    mask.position = char.position;
}
