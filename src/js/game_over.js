var gameOver = function(game) {};

gameOver.prototype = {
    init: function(time) {
        //TODO make something nicer
        alert("You deactivated the alarm after " + time + " seconds.");
    },
    create: function() {
        //insert ..zzZZ wave function here (this functions should call than the menu)
    },
    playGame: function() {
        this.game.state.start("StupidAlarm");
    }
};