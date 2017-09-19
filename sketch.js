var ball;
var balls = [];
var player;
var LEFT = 0;
var RIGHT = 1


function setup() {
	createCanvas(1200, 800);
	background(125);
	player = new Player();
	for (var i = 0; i < 3; i++) {
		balls.push(new Ball(100 + i * 300, 100, 100, (-1)**i));
	}
}

function draw() {
	background(125);
	player.show();

	for (var i = balls.length - 1; i >= 0; i--) {
		balls[i].show()
		balls[i].update()
		if (balls[i].hitFloor()) {
			balls[i].bounce();
		}
		if (balls[i].hitEdge()) {
			balls[i].bounceEdge();
		}
	}

	if (keyIsDown(LEFT_ARROW)) {
		player.move(LEFT);
	} else if (keyIsDown(RIGHT_ARROW)) {
		player.move(RIGHT);		
	}

	player.update()

}

// function keyPressed() {
// 	if (keyCode === LEFT_ARROW){
// 		console.log('left');
// 		player.move(LEFT);
// 	} else if (keyCode == RIGHT_ARROW) {
// 		console.log('right');
// 		player.move(RIGHT);
// 	}
// }
