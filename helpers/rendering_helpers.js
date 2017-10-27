function showScore() {
	textSize(32);
	textStyle(BOLD);
	fill(255);
	noStroke();
	text("Score: " + score, 30, 50);
}

function showLevel() {
	textSize(32);
	textStyle(BOLD);
	fill(255);
	noStroke();
	text("Level: " + level, width - textWidth("Level: " + level) - 30, 50);
}

function showPowerSummary() {
	textSize(32);
	textStyle(NORMAL);
	fill(255);
	noStroke();
	image(dynamite, 270, 35, 40, 40)
	text('x ', 290, 48);	
	text(bombsInHand, 315, 50);

	image(doubleArrows, 390, 35, 40, 40)
	text('x ', 410, 48);	
	text(activeArrowLimit, 435, 50);
}

function showGameOverText() {
	textSize(43);
	textStyle(BOLD);
	fill(255);
	noStroke();
	if(gameWon) {
		drawCenterText('Well Done!', 370);
		drawCenterText('You scored ' + score, 430);
	} else {
		drawCenterText('GAME OVER!', 370);
		drawCenterText('You scored ' + score, 430);			
	}
}

function drawCenterText(string, y) {
	text(string, (width - textWidth(string))/2, y);
}


function showNextLevelText() {
	seconds = 6
	var interval = setInterval(function() {
		background(0, 77, 111);
		textSize(70)

		// user may already be in next level because of a keypress
		// so we must double check levelPassed
		if (!levelPassed) {
			clearInterval(interval)
			shownNextLevelText = false;
			return;
		}

		if (seconds === 6) {
			drawCenterText('Next Level in...', 400);
			seconds--
		} else if (seconds > 0) {
			drawCenterText(seconds, 400);
			seconds--
		} else if (seconds === 0) {
			drawCenterText('Go!', 400);
			seconds--
		} else {
			clearInterval(interval)
			shownNextLevelText = false;				
			nextLevel();
		}
		
	}, 1000)
}
