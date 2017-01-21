var gameBoot = function(game) {
    console.log("Starting Stupid Alarm...");
};

gameBoot.prototype = {
    preload: function() {
        //TODO replace loading.png
        this.game.load.image("loading", "assets/loading.png");
    },
    create: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.game.start.state("Preload");
    }
};