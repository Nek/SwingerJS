var _ = require("mori");

var socket = io('http://localhost');
  socket.on('reload', function (data) {
    loadScript('js/game.js');
  });

var id;
var state;

var ctx = document.getElementById("canv").getContext('2d');

window.reloaded = function(logic) {
    console.log('reloaded');
    cancelAnimationFrame(id);

    if (state === undefined) {
        state = logic.init();
    }

    var loop = function(dt) {
        state = logic.update(state, dt);
        logic.draw(state, ctx, dt);
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

console.log("ENGINE");