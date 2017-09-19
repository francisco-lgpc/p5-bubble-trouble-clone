function Ball(x, y, r, vx, vy) {
	Element.call(this, x, y, r);

	this.vel = createVector(vx, vy);
	this.acc = createVector(0, 0.1);

	this.update = function () {
		this.pos.add(this.vel);
		this.vel.add(this.acc);		
	}

	this.bounce = function(r) {
		this.vel.y = -r * 0.07 - 3.5;
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