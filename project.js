var gameStyle = false;
var difficulty = -1; console.warn("MAKE SURE TO RESET THE DIFFICULTY")

var TitleScreen = document.getElementById("TitleScreen");
var Game = document.getElementById("Game");
var Underlines = document.getElementById("Underlines");
var Guess = document.getElementById("Guess");
var PvcOptions = document.getElementById("playerVsComputerOptions");
var PvpOptions = document.getElementById("playerVsPlayerOptions");
var PlayButton = document.getElementById("PlayButton");
const WordInput = document.getElementById("WordInput");

PvpOptions.style.display = "none";
PvcOptions.style.display = "none";
PlayButton.style.display = "none";
Game.style.display = "none";
WordInput.addEventListener("input", ShowPlay);


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

function ShowPlay() {
    WordInput.removeEventListener("input", ShowPlay);
    PlayButton.style.opacity = 0;
    PlayButton.style.display = "inline-block";
    var opac = 0;
    var anim = setInterval(FadePlay, 10);

    function FadePlay() {
        opac += .02;
        PlayButton.style.opacity = opac;
        if (opac >= 1) clearInterval(anim);
    } 
}

function ChooseDifficulty(difficulty) {
    if (this.difficulty < 0) { // Only calls when the difficulty hasn't been set!
        ShowPlay();
    }
    this.difficulty = difficulty;
}

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
    var word = "";

    if (difficulty == 0) {
        word = EasyWords[getRandomInt(EasyWords.length)];
    } else if (difficulty == 1) {
        word = MediumWords[getRandomInt(MediumWords.length)];
    } else {
        word = HardWords[getRandomInt(HardWords.length)];
    }
    console.debug(word);

    TitleScreen.style.display = "none";
    Game.style.display = "inline-block";

    for (var i = 0; i < word.length; i ++){
        showLines();
    }
    for (var i = 65; i <= 90; i++) {
        showLetters(i);
    }
}

function showLines() {
    var block = document.createElement("div");
    var line = document.createElement("img");
    block.appendChild(line);
    line.src = getImageTag();
    line.width = "80";
    line.height = "80";
    block.style.cssFloat = "left";
    block.style.position = "relative";
    Underlines.appendChild(block);
}

function showLetters(keycode) {
    var block = document.createElement("div");
    var letter = document.createElement("h1");
    block.appendChild(letter);
    block.className = "Letter"
    letter.innerHTML = String.fromCharCode(keycode);
    Guess.appendChild(block);
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}