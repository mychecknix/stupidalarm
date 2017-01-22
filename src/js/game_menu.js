var gameMenu = function (game) {
};

gameMenu.prototype = {
    create: function () {
        this.game.add.button(this.game.width * 0.1, this.game.height * 0.6, 'play', this.playGame, this);
        //clock
        this.game.add.sprite(this.game.width * 0.5, this.game.height * 0.3, 'bigClock');
        //character
        this.game.add.sprite(this.game.width * 0.7, this.game.height * 0.2, 'bigCharacter', 0);
        // game title
        this.game.add.text(this.game.width * 0.1, this.game.height * 0.2, 'Stupid Alarm', {font: '42px Arial', fill: '#ffffff'});

        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function () {
        if (space.isDown) {
            this.playGame();
        }
    },
    playGame: function () {
        this.game.state.start("StupidAlarm");
    }
};