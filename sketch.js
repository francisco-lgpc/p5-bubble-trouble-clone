var LEFT  = 0;
var RIGHT = 1

var gameOver = false

var player;
var balls;
var arrows;

var restarGameButton;
var numberOfBallsRadio;
var numberOfBalls;

function setup() {
	wrapperCanvas = select('.wrapper-canvas');
	var canvas = createCanvas(1600, 800).class('canvas');
	canvas.parent(wrapperCanvas);

	restarGameButton = createButton('Play Again').class('btn-restart');
	restarGameButton.parent(wrapperCanvas);
	restarGameButton.mouseClicked(restarGame);

	var div = createDiv('').class('wrapper');
	createElement('h2','Select the Number of Balls').parent(div);


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
	balls = []
	arrows = []
	player = new Player();
	numberOfBalls = numberOfBallsRadio.value();		

	for (var i = 0; i < numberOfBalls; i++) {
		balls.push(new Ball(100 + i * (width/numberOfBalls), 100, 100, (-1)**i));
	}	

	restarGameButton.hide();
}

function draw() {
	if (gameOver) {
		restarGameButton.show();
	} else {
		background(125);

		for (var i = arrows.length - 1; i >= 0; i--) {
			if (arrows[i].active == false) {
				arrows.splice(i, 1);
			}
		}

		for (var i = balls.length - 1; i >= 0; i--) {
			if (balls[i].hitFloor()) {
				balls[i].bounce(balls[i].r);
			}
			if (balls[i].hitEdge()) {
				balls[i].bounceEdge();
			}
			if (balls[i].intersects(player)) {
				gameOver = true;
				balls[i].strokeColor = color(255, 0, 0);
			}
			balls[i].show();
			balls[i].update();

			if (arrows[arrows.length - 1] && arrows[arrows.length - 1].intersects(balls[i])) {
				arrows[arrows.length - 1].active = false
				if (balls[i].r > 6.25) {
					balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5,  1, -3));
					balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5, -1, -3));
				}
				balls.splice(i, 1);
			}
		}

		if (arrows[arrows.length - 1]) {
			arrows[arrows.length - 1].update();
			arrows[arrows.length - 1].show();		
		}

		
		player.show();

		if (keyIsDown(LEFT_ARROW)) {
			player.move(LEFT);
		} else if (keyIsDown(RIGHT_ARROW)) {
			player.move(RIGHT);		
		}

		player.update();
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW){
		if (arrows[arrows.length - 1] === undefined || !arrows[arrows.length - 1].active) {
			arrows.push(new Arrow(player.pos.x, height));
		}
	}
}