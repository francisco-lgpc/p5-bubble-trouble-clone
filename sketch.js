var LEFT  = 0;
var RIGHT = 1;
var ENTER = 13;
var CTRL  = 17;
var SPACE_BAR = 32;

var gameOver      = false;
var gameWon       = false;
var levelPassed   = false
var startGameView = true;
var score         = 0;
var level         = 1;

var player;
var balls      = [];
var arrows     = [];
var powers     = [];
var explosions = [];

var activeArrowLimit = 1;
var bombsInHand      = 0;

var restarGameButton;
var wrapperCanvas;

var increaseLevelButton;
var decreaseLevelButton;

var countShootingFrames   = 0;
var countGameOverFrames   = 0;
var shownNextLevelText    = false;

var listeningKeyboard = true
var commandOptions;

var idle;
var slideRight;
var slideLeft;
var walkRight = [];
var walkLeft = [];
var bubble;
var doubleArrows;
var dynamite;
var explosion = [];

function preload(){
	idle         = loadImage('assets/adventurer_idle.png');
	shootRight   = loadImage('assets/adventurer_shoot_right.png');
	shootLeft    = loadImage('assets/adventurer_shoot_left.png');
	slideRight   = loadImage('assets/adventurer_slide_right.png');
	slideLeft    = loadImage('assets/adventurer_slide_left.png');
	walkRight[0] = loadImage('assets/adventurer_walk_right_1.png');
	walkRight[1] = loadImage('assets/adventurer_walk_right_2.png');
	walkLeft[0]  = loadImage('assets/adventurer_walk_left_1.png');
	walkLeft[1]  = loadImage('assets/adventurer_walk_left_2.png');
	bubble       = loadImage('assets/bubble.png');
	doubleArrows = loadImage('assets/arrows.png');
	dynamite     = loadImage('assets/dynamite.png');

	for (var i = 16; i > 0; i--) {
		explosion[i] = loadImage('assets/explosion/explosion_' + i + '.png');		
	}
}

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
	
	generateBalls(); // refer to generateBalls.js file
	
	startMenu.hide();

	print(commandOptions.value())
	if (commandOptions.value() === "voice commands") {
		listenVoiceCommands();
		listenKeyboardCommands(false);
	} else {
		listenKeyboardCommands(true);
	}
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
	generateBalls(); // refer to generateBalls.js file
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


function keyPressed() {
	if (!listeningKeyboard) return;

	if (keyCode === UP_ARROW){
		if (countActiveArrows() < activeArrowLimit) {
			player.shoot();
		} 
	}

	if (keyCode === CTRL && bombsInHand > 0 && !gameOver && !levelPassed) {
		triggerExplosion();
		bombsInHand--;
	}

	if (keyCode === SPACE_BAR || keyCode === ENTER) {
		if (gameOver) {
			restarGame();
		} else if (levelPassed) {
			nextLevel();
		}
	}
}

function checkKeyIsDown() {
	if (!listeningKeyboard) return;

	if (keyIsDown(LEFT_ARROW)) {
		player.move(LEFT);
	} else if (keyIsDown(RIGHT_ARROW)) {
		player.move(RIGHT);		
	}

	if (keyIsDown(SPACE_BAR)) {
		player.slide = true;
	} else {
		player.slide = false;
	}
}

function listenKeyboardCommands(boolean) {
	listeningKeyboard = boolean;
}

function listenVoiceCommands() {	
	var speechRec = new p5.SpeechRec('en-US');
	speechRec.onResult       = voiceCommands
	speechRec.continuous     = true;
	speechRec.interimResults = true
	speechRec.start();

	function voiceCommands() {
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostRecentWord = speechRec.resultString.split(' ').pop().toLowerCase();

		if(mostRecentWord[0] === "le") { 
			player.movingLeft  = true;
			player.movingRight = false;
		} else if(mostRecentWord[0] === "ri") { 
			player.movingLeft  = false; 
			player.movingRight = true; 
		} else if(mostRecentWord[0] === "st") { 
			player.stop(); 
		} else if(mostRecentWord[0] === "s" && mostRecentWord[mostRecentWord.length - 1] === "t") { 
			if (countActiveArrows() < activeArrowLimit) {
				player.shoot();
			}  
		} else if(mostRecentWord[0] === "b" || mostRecentWord[mostRecentWord.length - 1] === "om") { 
			if (bombsInHand > 0 && !gameOver && !levelPassed) {
				triggerExplosion();
				bombsInHand--;
			} 
		}
		console.log(mostRecentWord);
	}
}

function checkLevelPassed() {
	if (balls.length === 0) {
		levelPassed  = true;
	}	
}

function checkGameWon() {
	if (levelPassed && level === 10) {
		gameWon  = true;
		gameOver = true;
		shownNextLevelText = true;
	}
}

function triggerExplosion() {
	explosions.push({ frame: 16, pos: player.pos.copy() })
	for (var i = balls.length - 1; i >= 0; i--) {
		if(balls[i].pos.dist(player.pos) < balls[i].r + 150) {
			balls[i]
			balls[i].split();
			balls.splice(i, 1);
		}
	}
}

function explosionAnimation() {
	for (var i = explosions.length - 1; i >= 0; i--) {
		if (explosions[i].frame > 0) {
			image(explosion[explosions[i].frame], explosions[i].pos.x, explosions[i].pos.y, 400, 400);

			if (frameCount % 3 === 0 || explosions[i].frame > 6) {
				explosions[i].frame--;
			}
		} else {
			explosions.splice(i, 1);
		}
	}
}

function removeInactiveArrows() {
	for (var i = arrows.length - 1; i >= 0; i--) {
		if (arrows[i].active == false) {
			arrows.splice(i, 1);
		}
	}
}

function countActiveArrows() {
	var count = 0;
	for (var i = arrows.length - 1; i >= 0; i--) {
		if (arrows[i].active) { count++ } 
	}
	return count;
}

function generatePowersRandomly(prob) {
	if (random() < prob) {
		powers.push(new Power(30 + random(width - 60), height - 30, int(random(2) + 1)));
	}
}

function showAndUpdate(array) {
	for (var i = array.length - 1; i >= 0; i--) {
		array[i].show();
		array[i].update();
	}
}

function showScore() {
	textSize(32);
	textStyle(BOLD);
	fill(255);
	noStroke();
	text("Score: " + score, 30, 50);
}

function showLevel() {
	textSize(32);
	textStyle(BOLD);
	fill(255);
	noStroke();
	text("Level: " + level, width - textWidth("Level: " + level) - 30, 50);
}

function showPowerSummary() {
	textSize(32);
	textStyle(NORMAL);
	fill(255);
	noStroke();
	image(dynamite, 270, 35, 40, 40)
	text('x ', 290, 48);	
	text(bombsInHand, 315, 50);

	image(doubleArrows, 390, 35, 40, 40)
	text('x ', 410, 48);	
	text(activeArrowLimit, 435, 50);
}

function playerShootingAnimation() {
	if(player.shooting) {
		if(countShootingFrames > 5) {
			player.shooting = false;
		}
		countShootingFrames++;
	}
}

function showGameOverText() {
	textSize(43);
	textStyle(BOLD);
	fill(255);
	noStroke();
	if(gameWon) {
		drawCenterText('Well Done!', 370);
		drawCenterText('You scored ' + score, 430);
	} else {
		drawCenterText('GAME OVER!', 370);
		drawCenterText('You scored ' + score, 430);			
	}
}

function drawCenterText(string, y) {
	text(string, (width - textWidth(string))/2, y);
}

function updateLevel(amount) {
	// stores helper function in var 
	// to be returned and used as a callback
	var innerHelper = function() {
		level += amount || 0; // increment 0 if no argument was passed
		if (level === 0)  level = 10
		if (level === 11) level = 1

		textSize(18);
		
		var newText = "Level " + level
		levelText.html(newText);
		levelText.position((120 - textWidth(newText)) / 2, 40);
	}

	// run helper if no arguments were passed
	if (amount === undefined) innerHelper();

	return innerHelper;
}

function showNextLevelText() {
	seconds = 6
	var interval = setInterval(function() {
		background(0, 77, 111);
		textSize(70)

		// user may already be in next level because of a keypress
		// so we must double check levelPassed
		if (!levelPassed) {
			clearInterval(interval)
			shownNextLevelText = false;
			return;
		}

		if (seconds === 6) {
			drawCenterText('Next Level in...', 400);
			seconds--
		} else if (seconds > 0) {
			drawCenterText(seconds, 400);
			seconds--
		} else if (seconds === 0) {
			drawCenterText('Go!', 400);
			seconds--
		} else {
			clearInterval(interval)
			shownNextLevelText = false;				
			nextLevel();
		}
		
	}, 1000)
}

function generateButtons() {
	// Restart Game Button
	restarGameButton = select('.btn-start');
	restarGameButton.mouseClicked(restarGame);

	// Level Arrow Buttons
	increaseLevelButton = select('.btn-arrow-up');
	increaseLevelButton.mouseClicked(updateLevel(1));
	
	decreaseLevelButton = select('.btn-arrow-down');
	decreaseLevelButton.mouseClicked(updateLevel(-1));
}

function showGameOver() {	
	showGameOverText();
	countGameOverFrames++;
	if (countGameOverFrames > 150) {
		startGameView = true
		gameOver      = false;

		countGameOverFrames = 0
	}
}