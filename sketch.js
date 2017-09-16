var ball;
var me;
function setup() {
	createCanvas(1200, 800);
	background(125);
	me = new Element(width/2, height - 50, 50);
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
	console.log(ball.pos.y);
}
