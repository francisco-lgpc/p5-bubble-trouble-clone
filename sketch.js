var LEFT  = 0;
var RIGHT = 1

var gameOver = false

var balls = [];
var ball;
var player;
var arrows = [];
var arrow;

function setup() {
	createCanvas(1200, 800);
	background(125);
	player = new Player();
	for (var i = 0; i < 10; i++) {
		balls.push(new Ball(100 + i * 100, 100 - i*10, 100 - i*10, (-1)**i));
	}
}

function draw() {
	if (gameOver) {

	} else {
		background(125);

		for (var i = balls.length - 1; i >= 0; i--) {
			if (balls[i].hitFloor()) {
				balls[i].bounce(balls[i].r);
			}
			if (balls[i].hitEdge()) {
				balls[i].bounceEdge();
			}
			if (arrows[arrows.length - 1] && balls[i].intersects(arrows[arrows.length - 1])) {
				arrows[arrows.length - 1].active = false
				arrows.splice(arrows.length - 1, 1);
				balls[i].r *= .5;
			}
			if (balls[i].intersects(player)) {
				gameOver = true;
				balls[i].strokeColor = color(255, 0, 0);
			}
			balls[i].show();
			balls[i].update();
		}

		if (arrows[arrows.length - 1] && arrows[arrows.length - 1].active) {
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
