var _ = require('mori');

function init() {
    return _.hash_map("x", 0, "y", 0, "sx", 0, "sy", 0);
}

function moveLeft(input, t, state) {
    if (_.has_key(input, 37)) return _.assoc(state, "x", _.get(state, "x") - 1);
    return state;
}

function moveRight(input, t, state) {
    if (_.has_key(input, 39)) return _.assoc(state, "x", _.get(state, "x") + 1);
    else return state;
}

function moveUp(input, t, state) {
    if (_.has_key(input, 38)) return _.assoc(state, "y", _.get(state, "y") - 1);
    else return state;
}

function moveDown(input, t, state) {
    if (_.has_key(input, 40)) return _.assoc(state, "y", _.get(state, "y") + 1);
    else return state;
}

function update(state, input, t) {
    return _.pipeline(
        state,
        _.partial(moveLeft, input, t),
        _.partial(moveRight, input, t),
        _.partial(moveUp, input, t),
        _.partial(moveDown, input, t)
        )
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