#SwingerJS
Hot code swapping, baby!

An experiment on live JS code reloading.

Hopefully will allow me to prototype JS games interactively (ala Bret Victor demos).

===
Once:
1. npm install .
2. gulp client
3. sudo gulp watch
4. open http://localhost/

Iterate:
1. edit game.js
2. save game.js
3. look at http://localhost/

You have to export three functions:
init() : state
update(state, dt) : new_state
render(state, dt) : undefined

You can use all browserify compatible libraries.