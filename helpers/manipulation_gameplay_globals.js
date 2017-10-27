function removeInactiveArrows() {
	for (var i = arrows.length - 1; i >= 0; i--) {
		if (arrows[i].active == false) {
			arrows.splice(i, 1);
		}
	}
}

function countActiveArrows() {
	var count = 0;
	for (var i = arrows.length - 1; i >= 0; i--) {
		if (arrows[i].active) { count++ } 
	}
	return count;
}

function generatePowersRandomly(prob) {
	if (random() < prob) {
		powers.push(new Power(30 + random(width - 60), height - 30, int(random(2) + 1)));
	}
}

function showAndUpdate(array) {
	for (var i = array.length - 1; i >= 0; i--) {
		array[i].show();
		array[i].update();
	}
}

function generateBalls() {
	var ballSize;
	var numberOfBalls;
	switch (level) {
    case 1:
			numberOfBalls = 1;
			ballSize      = 12.5;
			break;
    case 2:
			numberOfBalls = 3;
			ballSize      = 12.5;
			break;
    case 3:
			numberOfBalls = 2;
			ballSize      = 25;
			break;
    case 4:
			numberOfBalls = 20;
			ballSize      = 6.25;
			break;
    case 5:
			numberOfBalls = 1;
			ballSize      = 50;
			break;
    case 6:
			numberOfBalls = 1;
			ballSize      = 100;
			break;
    case 7:
			numberOfBalls = 2;
			ballSize      = 100;
			break;
    case 8:
			numberOfBalls = 3;
			ballSize      = 100;
			break;
    case 9:
			numberOfBalls = 30;
			ballSize      = 6.25;
			break;
    case 10:
			numberOfBalls = 5;
			ballSize      = 100;
			break;
	}

	for (var i = 0; i < numberOfBalls; i++) {
		balls.push(new Ball(100 + i * ((width - 100)/numberOfBalls), 100, ballSize, (-1)**i));
	}		
}