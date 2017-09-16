function Ball(x, y, r, v) {
	Element.call(this, x, y, r);

	this.vel = createVector(v, 0);
	this.acc = createVector(0, 0.1);

	this.update = function () {
		this.pos.add(this.vel);
		this.vel.add(this.acc);		
	}

	this.bounce = function() {
		this.vel.y *= -1
		this.vel.y *= .98
	}

	this.hitFloor = function () {
		return this.pos.y + this.r >= height;
	}
}