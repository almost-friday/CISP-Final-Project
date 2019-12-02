// We are defining and initializing several important variables
var gameStyle = false;
var difficulty = -1;
var word = "";
var guesses = 5;
var correctGuesses = 0;

var Lines; // Assigned to later in the code

// The following lines get references to specific elements of the website that we will dynamically show/hide later in the code
var TitleScreen = document.getElementById("TitleScreen");
var Game = document.getElementById("Game");
var Underlines = document.getElementById("Underlines");
var Guess = document.getElementById("Guess");
var GallowsImage = document.getElementById("GallowImage");
var Images = GallowsImage.childNodes;
var PvcOptions = document.getElementById("playerVsComputerOptions");
//var PvpOptions = document.getElementById("playerVsPlayerOptions");
var PlayButton = document.getElementById("PlayButton");
var GuessesLeft = document.getElementById("GuessesLeft");

// These lines hide some elements of the website
//PvpOptions.style.display = "none";
PvcOptions.style.display = "none";
PlayButton.style.display = "none";

function ShowOptions(style) {
    // true for single player, false for 2 players
    gameStyle = style;
    //console.debug(gameStyle);
    if (gameStyle == true) {

        PvcOptions.style.display = "inline-block";
        PvpOptions.style.display = "none";
    } else {
        PvpOptions.style.display = "inline-block";
        PvcOptions.style.display = "none";
    }
}

function ChooseTheme(theme) {
    if (this.difficulty < 0) { // Only calls when the difficulty hasn't been set!
        PlayButton.style.opacity = 0;
        PlayButton.style.display = "inline-block";
        var opac = 0;
        var anim = setInterval(ShowPlay, 10);

    }
    this.difficulty = theme;

    function ShowPlay() {
        opac += .02;
        PlayButton.style.opacity = opac;
        if (opac >= 1) clearInterval(anim);
   } 
}

// We are initializing several arrays that hold all of the possible
function SetupGame() {

    var EasyWords = [
        "float", "integer", "boolean", "enum", "long", "array", "dictionary", "list", "char", "string", "hash",
        "pointer"

    ]

    var MediumWords = [
        "afghanistan", "armenia", "palestine", "australia", "barbados", "brazil", "comoros", "croatia", "denmark"
        , "eritrea", "fiji", "france", "ghana", "germany", "iceland", "japan"
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
    //console.debug(word);


    TitleScreen.style.display = "none";
    Game.style.display = "inline-block";

    for (var i = 0; i < word.length; i ++){
        showLines(word.charAt(i));
    }
    Lines = document.getElementsByClassName("Line");

    for (var i = 65; i <= 90; i++) {
        showLetters(i);
    }
}


function showLines(Letter) { // Instantiates all of the lines
    var block = document.createElement("div");
    var line = document.createElement("img");
    block.className = "Line";
    block.appendChild(line);
    line.src = getImageTag();
    Underlines.appendChild(block);

}

function UpdateLine (char){ // Checks the word to see is the guessed letter is in it. If the letter is correct,
    for (var i = 0; i < word.length; i++){// then the letter is displayed on the lines
        if (word[i] == char){
            Lines[i].innerHTML = char;
            correctGuesses ++;
        }
    }
}

function UpdateGallows () {
    console.log(Images);
    switch(guesses){
        case 4:
            Images[3].src = "resources/Gallows1.gif";
            break;
        case 3:
            Images[5].src = "resources/Gallows2.gif";
            break;
        case 2:
            Images[7].src = "resources/Gallows3.gif";
            break;
        case 1:
            Images[7].src = "resources/Gallows4.gif";
            break;
        case 0:
            Images[7].src = "resources/Gallows5.gif";
            break;
    }
}

function showLetters(keycode) { // Instantiates the 26 letter buttons that the player uses to guess
    var block = document.createElement("div");
    var letter = document.createElement("h1");
	var image = document.createElement("img");
	image.src = "";
    block.appendChild(letter);
    block.className = "Letter"

	block.onclick = function(){MakeGuess(String.fromCharCode(keycode))} // makes clicking the button call the MakeGuess function
    letter.innerHTML = String.fromCharCode(keycode);
	block.appendChild(image);
    Guess.appendChild(block);

function MakeGuess(Letter){
		console.log(Letter);

	block.onclick = function(){return false;}
    if(guesses > 0 && correctGuesses < word.length){
        if (word.includes(Letter)){
            Image.src = "resources/check.png"
            console.log("A correct letter has been guessed!");
            UpdateLine(Letter);
        } else {
            image.src = "resources/X.png"
            guesses--;
            GuessesLeft.innerHTML = "Guesses Left: " + guesses;
            UpdateGallows();
        }
    }

    if (guesses <= 0 || correctGuesses >= word.length) {
        var message = document.createElement("h1");
        Game.appendChild(message);

        if (guesses <= 0){
            message.innerHTML = "Sorry, You Lose!<br>The Word Was: " + word;
        } else {
            message.innerHTML = "Congratulations, You Win!!";
        }
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
