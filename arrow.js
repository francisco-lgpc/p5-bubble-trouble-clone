function Arrow(x, y) {
	Element.call(this, x, y, 2);

	this.vel = createVector(0, -8);
	this.initialPos = this.pos.copy();
	this.active = true

	this.show = function() {
		stroke(46, 139, 87);
		strokeWeight(4);
		line(this.pos.x, this.initialPos.y, this.pos.x, this.pos.y);

		fill(46, 139, 87);
		triangle(
			this.pos.x,          this.pos.y - this.r, 
			this.pos.x + this.r, this.pos.y + this.r, 
			this.pos.x - this.r, this.pos.y + this.r
		);
	}

	this.update = function () {
		this.pos.add(this.vel);
		if (this.hitTop()) {
			this.active = false;
		}
	}

	this.hitTop = function () {
		return this.pos.y < 0;
	}

	this.intersects = function (other) {
		if (abs(other.pos.x - this.pos.x) <= other.r && other.pos.y + other.r > this.pos.y) {
			return true;
		}

		return this.pos.dist(other.pos) < this.r + other.r

	}
}