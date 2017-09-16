var ball;
var me;
var LEFT = 0;
var RIGHT = 1


function setup() {
	createCanvas(1200, 800);
	background(125);
	me = new Player();
	ball = new Ball(100, 100, 100, 1);
}

function draw() {
	background(125);
	me.show();
	ball.show();
	ball.update();
	if (ball.hitFloor()) {
		ball.bounce();
	}
	me.update()
}
