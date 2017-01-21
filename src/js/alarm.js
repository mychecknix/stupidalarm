/**
 * add an alarm clock to the map
 *
 * @param x
 * @param y
 */
function add_alarm_clock() {
    alarm = game.add.audio('alarm', 0, true);
    alarm.play();
}

/**
 * calculate the maximum distance between the alarm clock and the character
 *
 * @returns {*}
 */
function calc_max_distance(x, y) {
    var distance;
    alarmClock = {
        x: x,
        y: y
    };
    if (alarmClock.x > (game.width / 2)) {
        if (alarmClock.y > (game.height / 2)) {
            // in lower right
            distance = game.physics.arcade.distanceToXY(alarmClock, 0, 0);
        }
        else {
            // in upper right
            distance = game.physics.arcade.distanceToXY(alarmClock, 0, game.height);
        }
    }
    else {
        if (alarmClock.y > (game.height / 2)) {
            // in lower left
            distance = game.physics.arcade.distanceToXY(alarmClock, game.width, 0);
        }
        else {
            // in upper left
            distance = game.physics.arcade.distanceToXY(alarmClock, game.width, game.height);
        }
    }
    return distance;
}

/**
 * set the volume of the alarm clock
 */
function update_audio_volume() {
    var distance = game.physics.arcade.distanceBetween(char, alarmClock);
    var diff = maxDistance - distance;
    var percentPerPixel = 100 / maxDistance;
    alarm.volume = (percentPerPixel * diff) / 100;
}
