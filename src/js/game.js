var actualGame = function () {
    alarm = null;
    alarmClock = null;
    mask = null;
    maxDistance = null;
    map = null;
    layer = null;
    maze = null;
    char = null;
    cursors = null;
    CHARACTER_FRAME_RATE = 5;
    lastPointerDownTime = null;
};

actualGame.prototype = {
    create: function () {
        // set background color to black
        game.stage.backgroundColor = 0x000000;

        // generate and add maze
        maze = maze_generator(maze_cols, maze_rows);
        game.load.tilemap('maze', null, get_csv_from_array(maze.maze), Phaser.Tilemap.CSV);
        map = game.add.tilemap('maze');
        map.addTilesetImage('Maze', 'tiles');
        layer = map.createLayer(0);
        map.setCollisionByExclusion([MAZE_FLOOR]);

        // add character and enable physics
        char = game.add.sprite(maze.startCell.x * box_size + 8, maze.startCell.y * box_size, 'character', 1);
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
        maxDistance = calc_max_distance(maze.lastCell.x * box_size, maze.lastCell.y * box_size);

        // add mask around character
        bmpData = game.make.bitmapData(300, 300);
        innerCircle = new Phaser.Circle(200, 200, 75);
        outerCircle = new Phaser.Circle(200, 200, 160);
        var gradient = bmpData.context.createRadialGradient(innerCircle.x, innerCircle.y, innerCircle.radius, outerCircle.x, outerCircle.y, outerCircle.radius);
        gradient.addColorStop(0.2, "transparent");
        gradient.addColorStop(0.7, "#000000");
        bmpData.circle(outerCircle.x, outerCircle.y, outerCircle.radius, gradient);
        vision = this.game.add.image(0, 0, bmpData);
        mask = game.add.graphics(0, 0);
        mask.beginFill(0xffffff, 1);
        mask.drawCircle(8, 16, 150);
        layer.mask = mask;

        // add fullscreen mode
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(goFullscreen, this);

        // reset timer
        game.time.reset();
    },
    update: function () {
        movement();
        update_audio_volume();

        if (game.physics.arcade.distanceBetween(char, alarmClock) <= 36) {
            alarm.stop();
            this.game.state.start("GameOver", true, false, Math.floor(game.time.totalElapsedSeconds()));
        }
    }
};

function goFullscreen() {
    if ((Date.now() - lastPointerDownTime) <= 250) {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        }
        else {
            game.scale.startFullScreen(false);
        }
    }

    lastPointerDownTime = Date.now();
}
