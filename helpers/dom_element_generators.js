function generateButtons() {
	// Restart Game Button
	restarGameButton = select('.btn-start');
	restarGameButton.mouseClicked(restarGame);

	// Level Arrow Buttons
	increaseLevelButton = select('.btn-arrow-up');
	increaseLevelButton.mouseClicked(updateLevel(1));
	
	decreaseLevelButton = select('.btn-arrow-down');
	decreaseLevelButton.mouseClicked(updateLevel(-1));
}
