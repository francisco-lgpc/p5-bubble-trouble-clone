var LEFT  = 0;
var RIGHT = 1;
var ENTER = 13;
var SPACE_BAR = 32;

var gameOver    = false;
var gameWon     = false;
var levelPassed = false
var score       = 0;
var level;

var player;
var balls;
var arrows;
var powers;
var activeArrowLimit;;

var restarGameButton;
var levelsRadio;
var wrapperLevelsRadio;
var wrapperCanvas;

var countShootingFrames = 0;

var idle;
var slideRight;
var slideLeft;
var walkRight = [];
var walkLeft = [];
var bubble;
var doubleArrows;

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
}

function setup() {
	wrapperCanvas = select('.wrapper-canvas');
	var canvas = createCanvas(1600, 800).class('canvas');
	canvas.parent(wrapperCanvas);

	generateButtons();
	generateLevelsRadio();

	restarGame();
}

function restarGame() {
	gameOver = false;
	score    = 0
	balls    = []
	arrows   = []
	powers   = []
	player   = new Player();
	
	activeArrowLimit = 1;
	
	level = int(levelsRadio.value());		
	generateBalls(); // refer to generateBalls.js file
	
	restarGameButton.hide();
	nextLevelButton.hide();
	selectLevelButton.hide();	
	wrapperLevelsRadio.hide();
}

function nextLevel() {
	levelPassed = false
	balls       = []
	arrows      = []
	powers      = []
	player      = new Player();

	activeArrowLimit = 1;

	level++;
	generateBalls(); // refer to generateBalls.js file
	
	nextLevelButton.hide();	
}

function selectLevel() {
	wrapperLevelsRadio.show();
}

function draw() {
	if (gameOver) {
		restarGameButton.show();
		selectLevelButton.show();
		showGameOverText();
	}	else if (levelPassed) {
		nextLevelButton.show();
	} else {
		background(0, 77, 111);

		checkGameWon();
		checkLevelPassed();
		removeInactiveArrows();

		for (var i = balls.length - 1; i >= 0; i--) {
			if (balls[i].intersects(player)) {
				gameOver = true;
				balls[i].strokeColor = color(255, 0, 0);
			}

			balls[i].show();
			balls[i].update();

			for (var j = arrows.length - 1; j >= 0; j--) {
				if (arrows[j].intersects(balls[i])) {
					score += balls[i].r * 4;
					arrows[j].active = false
					if (balls[i].r > 6.25) {
						balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5,  1, -3));
						balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5, -1, -3));
					}
					balls.splice(i, 1);
					break;
				}
			}
		}

		if (random() < .0006) {
			powers.push(new Power(random(width), height - 30, 1));
		}

		for (var i = powers.length - 1; i >= 0; i--) {
			if (player.intersects(powers[i])) {
				powers[i].active = true;
				powers[i].hidden = true;
			}

			if (powers[i].active && powers[i].type === 1) {
				activeArrowLimit++;
			} else {
				activeArrowLimit = 1;				
			}
			powers[i].show();
		}

		updateAndShowArrows();
		playerShootingAnimation();

		player.show();
		checkKeyIsDown();
		player.update();
	}

	showScore();
	showLevel();
}

function keyPressed() {
	if (keyCode === UP_ARROW){
		if (countActiveArrows() < activeArrowLimit) {
			var shootingOffset;
			if (player.vel.x >= 0) {
				shootingOffset = 30;
			} else {
				shootingOffset = -30;
			}
			arrows.push(new Arrow(player.pos.x + shootingOffset, height));
			player.shooting = true;
			countShootingFrames = 0;
		} 
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

function checkLevelPassed() {
	if (balls.length === 0) {
		levelPassed  = true;
	}	
}

function checkGameWon() {
	if (levelPassed && level === 10) {
		gameWon  = true;
		gameOver = true;
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

function updateAndShowArrows() {
	for (var i = arrows.length - 1; i >= 0; i--) {
		arrows[i].update();
		arrows[i].show();
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
		drawCenterText('Well Done!', 500);
		drawCenterText('You scored ' + score, 560);
	} else {
		drawCenterText('GAME OVER!', 500);
		drawCenterText('You scored ' + score, 560);			
	}
}

function drawCenterText(string, y) {
	text(string, (width - textWidth(string))/2, y)
}

function generateLevelsRadio() {
	wrapperLevelsRadio = select('.wrapper-levels-radio');
	var div = createDiv('').class('wrapper').parent(wrapperLevelsRadio);
	createElement('h2','Levels').parent(div);

	levelsRadio = createRadio();
	levelsRadio.class('wrapper').parent(wrapperLevelsRadio);
	for (var i = 1; i < 11; i++) {
		createDiv('');
		levelsRadio.option(i, i);
	}
	levelsRadio.value(1);
}

function generateButtons() {
	// Restart Game Button
	restarGameButton = createButton('Play Again').class('btn btn-restart');
	restarGameButton.parent(wrapperCanvas);
	restarGameButton.mouseClicked(restarGame);

	// Restart Game Button
	nextLevelButton = createButton('Next Level').class('btn');
	nextLevelButton.parent(wrapperCanvas);
	nextLevelButton.mouseClicked(nextLevel);

	// Select Leve Button
	selectLevelButton = createButton('Select Level').class('btn btn-select-level');
	selectLevelButton.parent(wrapperCanvas);
	selectLevelButton.mouseClicked(selectLevel);
}