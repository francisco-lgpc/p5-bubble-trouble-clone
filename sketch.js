var LEFT  = 0;
var RIGHT = 1;
var ENTER = 13;
var SPACE_BAR = 32;

var gameOver = false;
var gameWon  = false;
var score    = 0;
var level;

var player;
var balls;
var arrows;

var restarGameButton;
var numberOfBallsRadio;
var numberOfBalls;

var countShootingFrames = 0;

var idle;
var slideRight;
var slideLeft;
var walkRight = [];
var walkLeft = [];
var bubble;

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
}

function setup() {
	wrapperCanvas = select('.wrapper-canvas');
	var canvas = createCanvas(1600, 800).class('canvas');
	canvas.parent(wrapperCanvas);

	restarGameButton = createButton('Play Again').class('btn-restart');
	restarGameButton.parent(wrapperCanvas);
	restarGameButton.mouseClicked(restarGame);

	var div = createDiv('').class('wrapper');
	createElement('h2','Levels').parent(div);


	numberOfBallsRadio = createRadio();
	numberOfBallsRadio.class('wrapper');
	for (var i = 1; i < 11; i++) {
		createDiv('');
		numberOfBallsRadio.option(i, i);
	}
	numberOfBallsRadio.value(1);

	restarGame();
}

function restarGame() {
	gameOver = false;
	score    = 0
	balls    = []
	arrows   = []
	player   = new Player();
	
	level = int(numberOfBallsRadio.value());		
	generateBalls(); // refer to generateBalls.js file
	
	restarGameButton.hide();
}

function draw() {
	if (gameOver) {
		restarGameButton.show();
		showGameOverText();
	} else {
		background(0, 77, 111);

		checkGameWon();
		removeInactiveArrows();

		for (var i = balls.length - 1; i >= 0; i--) {
			if (balls[i].intersects(player)) {
				gameOver = true;
				balls[i].strokeColor = color(255, 0, 0);
			}

			balls[i].show();
			balls[i].update();

			if (arrows[arrows.length - 1] && arrows[arrows.length - 1].intersects(balls[i])) {
				score += balls[i].r * 4;
				arrows[arrows.length - 1].active = false
				if (balls[i].r > 6.25) {
					balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5,  1, -3));
					balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5, -1, -3));
				}
				balls.splice(i, 1);
			}
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
		if (arrows[arrows.length - 1] === undefined || !arrows[arrows.length - 1].active) {
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

	if (gameOver && (keyCode === SPACE_BAR || keyCode === ENTER)) {
		restarGame();
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

function checkGameWon() {
	if (balls.length === 0) {
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

function updateAndShowArrows() {
	if (arrows[arrows.length - 1]) {
		arrows[arrows.length - 1].update();
		arrows[arrows.length - 1].show();		
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