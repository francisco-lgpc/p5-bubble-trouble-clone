function Ball(x, y, r, vx, vy) {
	Element.call(this, x, y, r);

	this.vel = createVector(vx, vy);
	this.acc = createVector(0, 0.1);

	this.show = function () {
		image(bubble, this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.update = function () {
		this.pos.add(this.vel);
		this.vel.add(this.acc);		

		if (this.hitFloor()) { this.bounce() }
		if (this.hitEdge() ) { this.bounceEdge() }
	}

	this.split = function () {
		score += this.r * 4;
		if (this.r > 6.25) {
			balls.push(new Ball(this.pos.x, this.pos.y, this.r * .5,  1, -3));
			balls.push(new Ball(this.pos.x, this.pos.y, this.r * .5, -1, -3));
		}
	}

	this.bounce = function () {
		this.vel.y = -this.r * 0.07 - 3.5;
	}

	this.bounceEdge = function () {
		this.vel.x *= -1
	}

	this.hitFloor = function () {
		return this.pos.y + this.r >= height;
	}

	this.hitEdge = function() {
		return this.pos.x + this.r > width || this.pos.x - this.r < 0;
	}
}