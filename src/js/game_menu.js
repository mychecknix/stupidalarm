var gameMenu = function(game) {};

gameMenu.prototype = {
    create: function() {
        var playGame = this.game.add.button(160, 320, 'play', this.playGame, this);
        playGame.anchor.setTo(0.5, 0.5);
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function() {
        if (space.isDown)
            this.playGame();
    },
    playGame: function() {
        this.game.state.start("StupidAlarm");
    }
};