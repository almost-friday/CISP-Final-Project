// We are defining and initializing several important variables
var gameStyle = false;
var difficulty = -1;
var word = "";
var guesses = 5;

// The following lines get references to specific elements of the website that we will dynamically show/hide later in the code
var TitleScreen = document.getElementById("TitleScreen");
var Game = document.getElementById("Game");
var Underlines = document.getElementById("Underlines");
var Guess = document.getElementById("Guess");
var PvcOptions = document.getElementById("playerVsComputerOptions");
var PvpOptions = document.getElementById("playerVsPlayerOptions");
var PlayButton = document.getElementById("PlayButton");
var GuessesLeft = document.getElementById("GuessesLeft");
//blablabbla
// These lines hide some elements of the website
PvpOptions.style.display = "none";
PvcOptions.style.display = "none";
PlayButton.style.display = "none";


function ShowOptions(style) {
    // true for single player, false for 2 players
    gameStyle = style;
    console.debug(gameStyle);
    if (gameStyle == true) {

        PvcOptions.style.display = "inline-block";
        PvpOptions.style.display = "none";
    } else {
        PvpOptions.style.display = "inline-block";
        PvcOptions.style.display = "none";
    }
}

function ChooseDifficulty(difficulty) {
    if (this.difficulty < 0) { // Only calls when the difficulty hasn't been set!
        PlayButton.style.opacity = 0;
        PlayButton.style.display = "inline-block";
        var opac = 0;
        var anim = setInterval(ShowPlay, 10);

    }
    this.difficulty = difficulty;

    function ShowPlay() {
        opac += .02;
        PlayButton.style.opacity = opac;
        if (opac >= 1) clearInterval(anim);
   } 
}

// We are initializing several arrays that hold all of the possible
function SetupGame() {

    var EasyWords = [
        "cookie", "cucumber", "apple", "peach", "pasta", "pear", "carrot", "pie", "banana", "lemon", "cereal", "oatmeal", "egg", "pancake", "steak", "fish", "lettuce", "tomato",
        "bread", "cake", "salt", "juice", "coffee", "sausage"

    ]

    var MediumWords = [
        "sandwich"
    ]

    var HardWords = [
          "cognac", "beignets", "stromboli", "jumbalaya", "enokitake", "acerola", "loquat", "mangosteen", "paneer", "samosas", "fajitas", "tostada", "eucharist", "crabcake"
    ]


    if (difficulty == 0) {
        word = EasyWords[getRandomInt(EasyWords.length)];
    } else if (difficulty == 1) {
        word = MediumWords[getRandomInt(MediumWords.length)];
    } else {
        word = HardWords[getRandomInt(HardWords.length)];
    }
	word = word.toUpperCase();
    console.debug(word);


    TitleScreen.style.display = "none";
    Game.style.display = "inline-block";

    for (var i = 0; i < word.length; i ++){
        showLines(word.charAt(i));
    }
	var Lines = document.getElementsByClassName("Line");
	console.log(Lines[0].id);

    for (var i = 65; i <= 90; i++) {
        showLetters(i);
    }
}


function showLines(Letter) {
    var block = document.createElement("div");
    var line = document.createElement("img");
    block.appendChild(line);
    line.src = getImageTag();
    line.width = "80";
    line.height = "80";
	line.className = "Line";
	line.id = Letter;
    block.style.cssFloat = "left";
    block.style.position = "relative";
    Underlines.appendChild(block);

}

function UpdateLine (char){
	for (var i = 0; i < word.length; i++){

		if (Lines[i].id == char) {
		    	var letter = document.createElement("h1");
			letter.innerHTML = char;
			Lines[i].img.src = "";
		}
	}
}

function showLetters(keycode) {
    var block = document.createElement("div");
    var letter = document.createElement("h1");
	var image = document.createElement("img");
	image.src = "";
    block.appendChild(letter);
    block.className = "Letter"
	block.onclick = function(){MakeGuess(String.fromCharCode(keycode))}
    letter.innerHTML = String.fromCharCode(keycode);
	block.appendChild(image);
    Guess.appendChild(block);

function MakeGuess(Letter){
		console.log(Letter);

	block.onclick = function(){return false;}

	if (word.includes(Letter)){
		UpdateLine(Letter);
		letter.innerHTML = "";
	} else {
		image.src = "resources/X.png"
		guesses--;
		GuessesLeft.innerHTML = "Guesses Left: " + guesses;
	}
}
}


function getImageTag() {
    var ImageURLs = [
        1, 2, 3
    ]

    var img = 'resources/Line';
    img += ImageURLs[getRandomInt(3)];
    img += '.gif';
    return img;
}

// A handy function that returns a random number with a parameter that controls the maximum
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}