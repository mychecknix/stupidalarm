var gamePreload = function (game) {
};

gamePreload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.load.spritesheet("character", "assets/character_sprite.png", 16, 32, 8);
        this.game.load.audio("alarm", "assets/Kevin_MacLeod_-_Monkeys_Spinning_Monkeys.mp3");
        this.game.load.spritesheet("tiles", "assets/tiles.png", 32, 32, 3);
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("replay", "assets/replay.png");
        this.game.load.image("bigCharacter", "assets/character_big.png");
        this.game.load.image("bigCharacterSleeping", "assets/character_big_sleep.png");
        this.game.load.image("zzz", "assets/z.png");
        this.game.load.image("bigClock", "assets/clock_big.png");
    },
    create: function () {
        this.game.state.start("Menu");
    }
};