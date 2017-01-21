var gameBoot = function(game) {
    console.log("Starting Stupid Alarm...");
};

gameBoot.prototype = {
    preload: function() {
        //TODO replace loading.png
        this.game.load.image("loading", "assets/loading.png");
    },
    create: function() {
        this.game.state.start("Preload");
    }
};