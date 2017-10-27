function showGameOver() {	
	showGameOverText();
	countGameOverFrames++;
	if (countGameOverFrames > 150) {
		startGameView = true
		gameOver      = false;

		countGameOverFrames = 0
	}
}

function updateLevel(amount) {
	// stores helper function in var 
	// to be returned and used as a callback
	var innerHelper = function() {
		level += amount || 0; // increment 0 if no argument was passed
		if (level === 0)  level = 10
		if (level === 11) level = 1

		textSize(18);
		
		var newText = "Level " + level
		levelText.html(newText);
		levelText.position((120 - textWidth(newText)) / 2, 40);
	}

	// run helper if no arguments were passed
	if (amount === undefined) innerHelper();

	return innerHelper;
}