function Player() {
	Element.call(this, width/2, height - 30, 30);



	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.update = function () {
		this.pos.add(this.vel);
		this.vel.add(this.acc);

		this.acc.mult(0)		
	}

	this.move = function (dir) {
		if (dir === LEFT) {
			this.acc.x += 0.1
		} else if (dir === RIGHT) {
			this.acc.x -= 0.1
		}
	}


	this.hitFloor = function () {
		return this.pos.y + this.r >= height;
	}
}