function Element(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r;

	this.show = function () {
		fill(0);
		stroke(0);

		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.intersects = function (other) {
		return this.pos.dist(other.pos) < this.r + other.r
	}
}