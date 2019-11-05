var gameStyle = false;


var PvcOptions = document.getElementById("PvcOptions");
var PvpOptions = document.getElementById("PvpOptions");

function ShowOptions(style) {

    gameStyle = style;
    console.debug(gameStyle);
    if (gameStyle == true) {

        options.style.display = "inline-block";
    }

    else {
        options.style.display = "none";
    }
}