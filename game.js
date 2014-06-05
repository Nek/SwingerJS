var _ = require('mori');

function once(f) {
    if (f.done) return;
    f.done = true;
    f();
}

function reset(s) {
    if (reset.done)
    return init();
}

function init() {
    return _.hash_map("x", 0, "y", 0);
}

function update(state, dt) {
    var s0 = _.assoc(state, "x", _.get(state, "x") + .1);
    var s1 = _.assoc(s0, "y", _.get(state, "y") + .1);
    return s1;
}

function draw(state, ctx, dt) {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.clearRect(0,0,300,150);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(_.get(state, "x"), _.get(state, "y"), 20,20);
}

exports = {
    update: update,
    draw: draw,
    init: init
}

if (window.reloaded) window.reloaded(exports);
else window.logic = exports;