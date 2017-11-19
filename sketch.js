function setup() {
	wrapperCanvas = select('.wrapper-canvas');
	var canvas = createCanvas(1600, 800).class('canvas');
	canvas.parent(wrapperCanvas);

	imageMode(CENTER)

	generateButtons();
	wrapperLevel = select('.wrapper-level')
	levelText    = select('.level-text')
	startMenu    = select('.wrapper-start-menu')

	commandOptions = createRadio().class("command-options");

	commandOptions.option('voice commands');
	commandOptions.option('keyboard commands').checked = true;

	commandOptions.elt.addEventListener('change', setCommands);

}

function restarGame() {
	startGameView = false;

	score      = 0
	balls      = []
	arrows     = []
	powers     = []
	explosions = []
	player     = new Player();
	
	activeArrowLimit = 1;
	bombsInHand      = 0;
	
	generateBalls();
	
	startMenu.hide();

	setCommands();
}

function nextLevel() {
	levelPassed = false
	balls       = []
	arrows      = []
	powers      = []
	explosions  = []
	player      = new Player();

	activeArrowLimit = 1;
	bombsInHand      = 0;

	level++;
	generateBalls();
}

function draw() {
	if (gameOver) {
		showGameOver();
	}	else if (startGameView) {
		background(0, 77, 111);
		startMenu.show();
		updateLevel();		
	}	else if (levelPassed) {
		checkGameWon();
		if (!shownNextLevelText) {
			showNextLevelText();
			shownNextLevelText = true;
		}
	} else {
		background(0, 77, 111);
		checkLevelPassed();
		removeInactiveArrows();

		showAndUpdate(balls);

		generatePowersRandomly(0.0006);

		showAndUpdate(powers);
		showAndUpdate(arrows);
		showAndUpdate([player]);

		playerShootingAnimation();
		checkKeyIsDown();

		if (player.movingLeft) {
			player.move(LEFT);
		} else if (player.movingRight) {
			player.move(RIGHT);
		}
	}
	explosionAnimation();
	
	showScore();
	showPowerSummary();
	showLevel();
}