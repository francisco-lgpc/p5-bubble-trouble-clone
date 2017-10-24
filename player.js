function Player() {
	Element.call(this, width/2, height - 30, 30);

	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.slide = false;
	this.shooting = false

	this.color = color(30, 20, 223);
	this.strokeColor = color(0, 0);

	// Voice commmand properties
	this.movingLeft  = false;
	this.movingRight = false;

	this.show = function() {
		imageMode(CENTER)
		if (this.shooting) {
			if (this.vel.x >= 0) {
				image(shootRight, this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
			} else {
				image(shootLeft, this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
			}
		} else if (abs(this.vel.x) < 0.5) {
			image(idle, this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
		} else if (this.vel.x < 4 && this.vel.x >= 0.5) {
			image(walkRight[int(frameCount/15) % 2], this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
		} else if (this.vel.x >= 4) {
			image(slideRight, this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
		} else if (this.vel.x > -4 && this.vel.x <= -0.5) {
			image(walkLeft[int(frameCount/15) % 2], this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
		} else if (this.vel.x <= -4) {
			image(slideLeft, this.pos.x, this.pos.y - 2/5 * this.r, this.r * 2 + 4/5 * this.r, this.r * 2 + 4/5 * this.r)
		}
		// noFill()
		// ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
	}

	this.update = function () {
		if (this.acc.x === 0 && this.vel.x !== 0) {
			this.drag();
		}
		this.pos.add(this.vel);
		this.vel.add(this.acc);

		if (!this.slide) {
			this.vel.x = constrain(this.vel.x, -3, 3);
		}

		this.pos.x = constrain(this.pos.x, 0 + this.r, width - this.r);

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

	this.stop = function() {
		this.break();
		this.movingRight = false
		this.movingLeft  = false
	}

	this.drag = function() {
		if (abs(this.vel.x) <= .05) {
			this.vel.mult(0);
		} else {
			this.vel.mult(.94);	
		}	
	}

	this.shoot = function() {
		var shootingOffset;
		if (this.vel.x >= 0) {
			shootingOffset = 30;
		} else {
			shootingOffset = -30;
		}
		arrows.push(new Arrow(this.pos.x + shootingOffset, height));
		this.shooting = true;
		countShootingFrames = 0;
	}

	this.hitFloor = function () {
		return this.pos.y + this.r >= height;
	}
}