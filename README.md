#SwingerJS
Hot code swapping, baby!

An experiment on live coding with JS.

Hopefully this will allow me to prototype JS games interactively (ala Bret Victor's Inventing on Principle).

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
- init() : state
- update(state, dt) : new_state
- render(state, dt) : undefined

Don't remove last two lines of game.js. It's a little bit of magic to keep game's state intact. This will change in the future to be less magical.

You can use all browserify compatible libraries.

P.S.
There is a mori (immutable data structures) library included 'cause I'm going to use it for Bret Victor's kind of stuff.

TODO:
Copy Elm Debugger for JS
http://www.youtube.com/watch?v=zybahE0aQqA