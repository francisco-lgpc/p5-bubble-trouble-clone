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
	var speechRec;
	function speechRecInit() {	
		speechRec = new p5.SpeechRec('en-US');
		speechRec.onResult       = voiceCommands
		speechRec.continuous     = true;
		speechRec.interimResults = true;
		speechRec.start();
	}

	speechRecInit();

	function voiceCommands() {
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:

		// Exit callback if there is no value
		if (!speechRec.resultValue) {
			return;
		}

		var mostRecentWord = speechRec.resultString.split(' ').pop().toLowerCase();
		speechRecInit();

		if(mostRecentWord[0] === "b" || mostRecentWord.indexOf("oo") !== -1) { 
			if (bombsInHand > 0 && !gameOver && !levelPassed) {
				triggerExplosion();
				bombsInHand--;
			} 
		} else if(mostRecentWord.slice(0, 2) === "le") { 
			player.movingLeft  = true;
			player.movingRight = false;
		} else if(mostRecentWord[0] === "r" || mostRecentWord.slice(0, 2) === "wr") { 
			player.movingLeft  = false; 
			player.movingRight = true; 
		} else if(mostRecentWord.slice(0, 2) === "st") { 
			player.stop(); 
		} else if(mostRecentWord.slice(0, 2) === "sh" || mostRecentWord.slice(0, 2) === "su") { 
			if (countActiveArrows() < activeArrowLimit) {
				player.shoot();
			}  
		}
		console.log(mostRecentWord);
		// console.log(mostRecentWord.slice(0, 2));
	}
}
