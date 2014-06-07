var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var socket = null;

gulp.task('client', function() {
    // Single entry point to browserify
    gulp.src('client.js')
    .pipe(browserify({
        insertGlobals : false,
        debug : false
    }))
    .pipe(rename('swinger.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('game', function() {
    return gulp.src(['game.js', 'magic.js'])
    .pipe(concat('game.js'))
    .pipe(browserify({
        insertGlobals : false,
        debug : false
    }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('reloader', function() {
    var express = require('express');
    var app = express();
    var router = express.Router();
    router.use(express.static(__dirname + '/public'));
    app.use('', router);
    var server = require('http').Server(app);
    server.listen(80);
    io = require('socket.io')(server);
    io.on("connection", function(sock) {
        socket = sock;
        sock.on('disconnect', function(){
            socket.emit("reload", {});
            console.log('user disconnected');
            socket = null;
      }); 
});

})

gulp.task('reload', ['game'], function() {
    if (socket !== null) io.emit('reload', {});
})

gulp.task('watch', ['reloader'], function() {
  gulp.watch('game.js', ['reload']);
});