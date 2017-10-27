function checkLevelPassed() {
	if (balls.length === 0) {
		levelPassed  = true;
	}	
}

function checkGameWon() {
	if (levelPassed && level === 10) {
		gameWon  = true;
		gameOver = true;
		shownNextLevelText = true;
	}
}