function Player() {
	Element.call(this, width/2, height - 30, 30);

	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.update = function () {
		if (this.acc.x === 0 && this.vel.x !== 0) {
			this.drag();
		}
		this.pos.add(this.vel);
		this.vel.add(this.acc);

		this.acc.mult(0)		
	}

	this.move = function (dir) {
		if (dir === RIGHT) {
			this.acc.x += .15
		} else if (dir === LEFT) {
			this.acc.x -= .15
		}

		if (this.acc.x * this.vel.x < 0) {
			this.break();
		}
	}

	this.break = function() {
		this.vel.mult(.85);
	}

	this.drag = function() {
		if (abs(this.vel.x) <= .05) {
			this.vel.mult(0);
		} else {
			this.vel.mult(.94);	
		}
		
	}

	this.hitFloor = function () {
		return this.pos.y + this.r >= height;
	}
}