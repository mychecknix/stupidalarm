var gameMenu = function (game) {
};

gameMenu.prototype = {
    create: function () {
        var playGame = this.game.add.button(this.game.width * 0.1, this.game.height * 0.6, 'play', this.playGame, this);
        //wall
        var tilepart1 = this.game.add.sprite(this.game.width - 32, this.game.height - 32, 'tiles', 1);
        //floor
        var tilepart2 = this.game.add.sprite(this.game.width - 64, this.game.height - 32, 'tiles', 0);
        //clock
        var tilepart3 = this.game.add.sprite(this.game.width - 32, this.game.height - 64, 'tiles', 2);
        //character
        var tilepart4 = this.game.add.sprite(this.game.width * 0.7, this.game.height * 0.2, 'bigCharacter', 0);
        //tilepart4.scaleetTo(10, 10);

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