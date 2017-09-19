function Element(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r;
	this.color = color(0);
	this.strokeColor = color(0);

	this.show = function () {
		fill(this.color);
		stroke(this.strokeColor);

		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.intersects = function (other) {
		return this.pos.dist(other.pos) < this.r + other.r
	}
}