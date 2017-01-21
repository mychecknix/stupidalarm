function add_alarm_clock() {
    alarmClock = game.add.sprite(800, 400, 'dummy');
    alarmClock.tint = 0xff00ff;
    alarm = game.add.audio('alarm', 0, true);
    alarm.play();
}

function calc_max_distance() {
    var distance;
    if (alarmClock.position.x > (game.width / 2)) {
        if (alarmClock.position.y > (game.height / 2)) {
            // in lower right
            distance = game.physics.arcade.distanceToXY(alarmClock, 0, 0);
        }
        else {
            // in upper right
            distance = game.physics.arcade.distanceToXY(alarmClock, 0, game.height);
        }
    }
    else {
        if (alarmClock.position.y > (game.height / 2)) {
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

function update_audio_volume() {
    var distance = game.physics.arcade.distanceBetween(char, alarmClock);
    var diff = maxDistance - distance;
    var percentPerPixel = 100 / maxDistance;
    alarm.volume = (percentPerPixel * diff) / 100;
}
