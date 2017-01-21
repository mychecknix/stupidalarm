var actualGame = function() {
    alarm = null;
    alarmClock = null;
    mask = null;
    maxDistance = null;
    map = null;
    layer = null;
    MAZE_WIDTH = 32;
    MAZE_HEIGHT = 18;
    maze = null;
    char = null;
    cursors = null;
    BOX_SIZE = 32;
    CHARACTER_FRAME_RATE = 5;
};

actualGame.prototype = {
    create: function() {
        // generate and add maze
        maze = maze_generator(MAZE_WIDTH, MAZE_HEIGHT);
        game.load.tilemap('maze', null, get_csv_from_array(maze.maze), Phaser.Tilemap.CSV);
        map = game.add.tilemap('maze');
        map.addTilesetImage('Maze', 'tiles');
        layer = map.createLayer(0);
        map.setCollisionByExclusion([MAZE_FLOOR]);

        // add character and enable physics
        char = game.add.sprite(maze.startCell.x * BOX_SIZE + 8, maze.startCell.y * BOX_SIZE, 'character', 1);
        game.physics.enable(char, Phaser.Physics.ARCADE);
        char.body.collideWorldBounds = true;

        // add animation to character
        char.animations.add('up', [1, 5], CHARACTER_FRAME_RATE, true);
        char.animations.add('down', [0, 4], CHARACTER_FRAME_RATE, true);
        char.animations.add('left', [2, 6], CHARACTER_FRAME_RATE, true);
        char.animations.add('right', [3, 7], CHARACTER_FRAME_RATE, true);

        // cursors for movement
        cursors = game.input.keyboard.createCursorKeys();

        // add alarm clock
        add_alarm_clock();
        maxDistance = calc_max_distance(maze.lastCell.x * BOX_SIZE, maze.lastCell.y * BOX_SIZE);

        // add mask around character
        mask = game.add.graphics(0, 0);
        mask.beginFill(0xffffff, 1);
        mask.drawCircle(8, 16, 150);
        layer.mask = mask;

        // add fullscreen mode
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(goFull, this); // TODO only enter fullscreen on mouse click (or better, add double click for fullscreen)
    },
    update: function() {
        movement();
        update_audio_volume();

        if (game.physics.arcade.distanceBetween(char, alarmClock) <= BOX_SIZE) {
            // TODO replace 120 with actual time
            alarm.stop();
            this.game.state.start("GameOver", true, false, 120);
        }
    }
};

function goFull() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    }
    else {
        game.scale.startFullScreen(false);
    }
}
