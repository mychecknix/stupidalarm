var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
game.state.add("Boot", gameBoot);
game.state.add("Preload", gamePreload);
game.state.add("Menu", gameMenu);
game.state.add("StupidAlarm", actualGame);
game.state.add("GameOver", gameOver);
game.start.state("Boot");