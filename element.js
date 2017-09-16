function Element(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r;

	this.show = function () {
		fill(0);
		ellipse(this.pos.x, this.pos.y, r*2, r*2);
	}

	this.intersects = function (other) {
		this.pos.dist(other.pos) < this.r + other.r
	}
}