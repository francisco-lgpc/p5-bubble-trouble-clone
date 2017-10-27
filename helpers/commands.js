function setCommands() {
	if (commandOptions.value() === "voice commands") {
		listenVoiceCommands();
		listenKeyboardCommands(false);
	} else {
		listenKeyboardCommands(true);
	}			
}

function keyPressed() {
	if (!listeningKeyboard) return;

	if (keyCode === UP_ARROW){
		if (countActiveArrows() < activeArrowLimit) {
			player.shoot();
		} 
	}

	if (keyCode === CTRL && bombsInHand > 0 && !gameOver && !levelPassed) {
		triggerExplosion();
		bombsInHand--;
	}

	if (keyCode === SPACE_BAR || keyCode === ENTER) {
		if (gameOver) {
			restarGame();
		} else if (levelPassed) {
			nextLevel();
		}
	}
}

function checkKeyIsDown() {
	if (!listeningKeyboard) return;

	if (keyIsDown(LEFT_ARROW)) {
		player.move(LEFT);
	} else if (keyIsDown(RIGHT_ARROW)) {
		player.move(RIGHT);		
	}

	if (keyIsDown(SPACE_BAR)) {
		player.slide = true;
	} else {
		player.slide = false;
	}
}

function listenKeyboardCommands(boolean) {
	listeningKeyboard = boolean;
}

function listenVoiceCommands() {	
	var speechRec = new p5.SpeechRec('en-US');
	speechRec.onResult       = voiceCommands
	speechRec.continuous     = true;
	speechRec.interimResults = true
	speechRec.start();

	function voiceCommands() {
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostRecentWord = speechRec.resultString.split(' ').pop().toLowerCase();

		if(mostRecentWord[0] === "le") { 
			player.movingLeft  = true;
			player.movingRight = false;
		} else if(mostRecentWord[0] === "ri") { 
			player.movingLeft  = false; 
			player.movingRight = true; 
		} else if(mostRecentWord[0] === "st") { 
			player.stop(); 
		} else if(mostRecentWord[0] === "s" && mostRecentWord[mostRecentWord.length - 1] === "t") { 
			if (countActiveArrows() < activeArrowLimit) {
				player.shoot();
			}  
		} else if(mostRecentWord[0] === "b" || mostRecentWord[mostRecentWord.length - 1] === "om") { 
			if (bombsInHand > 0 && !gameOver && !levelPassed) {
				triggerExplosion();
				bombsInHand--;
			} 
		}
		console.log(mostRecentWord);
	}
}
