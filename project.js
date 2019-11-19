var gameStyle = false;
var difficulty = -1;

var TitleScreen = document.getElementById("TitleScreen");
var Game = document.getElementById("Game");
var PvcOptions = document.getElementById("playerVsComputerOptions");
var PvpOptions = document.getElementById("playerVsPlayerOptions");
var PlayButton = document.getElementById("PlayButton");

PvpOptions.style.display = "none";
PvcOptions.style.display = "none";
PlayButton.style.display = "none";
Game.style.display = "none";

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

function Play() {
    TitleScreen.style.display = "none";
    Game.style.display = "inline-block";

    var EasyWords = [
        "cookie", "cucumber", "apple", "peach", "pasta", "pear", "carrot", "pie", "banana", "lemon", "cereal", "oatmeal", "egg", "pancake", "steak", "fish", "lettuce", "tomato",
        "bread", "cake", "salt", "juice", "coffee", "sausage"

    ]

    var MediumWords = [

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
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}