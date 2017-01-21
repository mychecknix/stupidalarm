function add_alarm_clock() {
    alarmClock = game.add.sprite(800, 400, 'dummy');
    alarmClock.tint = 0xff00ff;
    alarm = game.add.audio('alarm');
    alarm.play();
}

function calc_max_distance() {
    //TODO
    return 0;
}

function updateAudioVolume() {
    distance = game.physics.arcade.distanceBetween(char, alarmClock);
    diff = maxDistance - distance;
    percentPerPixel = 100/maxDistance;
    volume = (percentPerPixel * diff) / 100;
    alarm.volume = volume;
}