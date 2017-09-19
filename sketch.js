var ball;
var player;
var LEFT = 0;
var RIGHT = 1


function setup() {
	createCanvas(1200, 800);
	background(125);
	player = new Player();
	ball = new Ball(100, 100, 100, 1);
}

function draw() {
	background(125);
	player.show();
	ball.show();
	ball.update();
	if (ball.hitFloor()) {
		ball.bounce();
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
