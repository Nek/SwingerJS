var _ = require("mori");

var socket = io('http://localhost');
  socket.on('reload', function (data) {
    loadScript('js/game.js');
  });

var id;
var state;

var ctx = document.getElementById("canv").getContext('2d');

document.addEventListener("keydown", pressKey);
document.addEventListener("keyup", releaseKey);

var input = _.set();

function pressKey(e) {
    input = _.conj(input, e.keyCode);
}

function releaseKey(e) {
    input = _.disj(input, e.keyCode);
}

window.reloaded = function(logic) {
    console.log('game.js reloaded.');
    cancelAnimationFrame(id);

    if (state === undefined) {
        state = logic.init();
    }

    var loop = function(t) {
        state = logic.update(state, input, t);
        logic.draw(state, ctx, t);
        id = requestAnimationFrame(loop);
    };

    id = requestAnimationFrame(loop);
}

if (window.logic) window.reloaded(window.logic);

function loadScript(scriptName) {
    var oldScript = document.getElementById("game");
    if (oldScript) oldScript.parentElement.removeChild(oldScript);
    var docHeadObj = document.getElementsByTagName("head")[0];
    var dynamicScript = document.createElement("script");
    dynamicScript.type = "text/javascript";
    dynamicScript.src = scriptName;
    dynamicScript.id = "game";
    docHeadObj.appendChild(dynamicScript);
}

console.log("Engine loaded.");