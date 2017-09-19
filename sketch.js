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
	for (var i = 0; i < 3; i++) {
		balls.push(new Ball(100 + i * 300, 100, 100, (-1)**i));
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
			if (balls[i].intersects(player)) {
				gameOver = true;
				balls[i].strokeColor = color(255, 0, 0);
			}
			balls[i].show();
			balls[i].update();

			if (arrows[arrows.length - 1] && arrows[arrows.length - 1].intersects(balls[i])) {
				arrows[arrows.length - 1].active = false
				arrows.splice(arrows.length - 1, 1);
				if (balls[i].r > 6.25) {
					balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5, 1, -3));
					balls.push(new Ball(balls[i].pos.x, balls[i].pos.y, balls[i].r * .5, -1, -3));
				}
				balls.splice(i, 1);
			}
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
