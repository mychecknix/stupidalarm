var gameOver = function(game) {};

gameOver.prototype = {
    init: function(time) {
        //TODO make something nicer
        alert("You deactivated the alarm after " + time + " times.");
    },
    create: function() {
        var playGame = this.game.add.button(160, 320, "play", this.playGame, this);
        playGame.anchor.setTo(0.5, 0.5);
    },
    playGame: function() {
        this.game.state.start("StupidAlarm");
    }
};