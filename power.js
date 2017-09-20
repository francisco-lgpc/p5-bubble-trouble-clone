function Power(x, y, type) {
	Element.call(this, x, y, 30);

	this.active = false;
	this.type   = type;
	this.hidden = false;

	switch (this.type) {
	  case 1:
	  	this.img = doubleArrows;
			break;
	  case 2:
	  	this.img = dynamite;
			break;
	}

	this.show = function() {
		if (!this.hidden) {
			image(this.img, this.pos.x, this.pos.y, this.r*2, this.r*2);
		}
		// ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.update = function() {

	}
}