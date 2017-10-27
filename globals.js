var LEFT  = 0;
var RIGHT = 1;
var ENTER = 13;
var CTRL  = 17;
var SPACE_BAR = 32;

var gameOver      = false;
var gameWon       = false;
var levelPassed   = false
var startGameView = true;
var score         = 0;
var level         = 1;

var player;
var balls      = [];
var arrows     = [];
var powers     = [];
var explosions = [];

var activeArrowLimit = 1;
var bombsInHand      = 0;

var restarGameButton;
var wrapperCanvas;

var increaseLevelButton;
var decreaseLevelButton;

var countShootingFrames   = 0;
var countGameOverFrames   = 0;
var shownNextLevelText    = false;

var listeningKeyboard = true
var commandOptions;

var idle;
var slideRight;
var slideLeft;
var walkRight = [];
var walkLeft = [];
var bubble;
var doubleArrows;
var dynamite;
var explosion = [];