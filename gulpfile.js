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

gulp.task('start-reload-server', function() {
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

gulp.task('reload', function() {
    if (socket !== null) io.emit('reload', {});
})

var util = require("gulp-util")
var plumber = require("gulp-plumber")
var tap = require("gulp-tap")
var opts = {watch:true};
var bundler;

var source = require('vinyl-source-stream');
var watchify = require('watchify')

gulp.task('watch', ['start-reload-server'], function() {
    gulp.watch('./public/js/game.js', ['reload']);
    var bundler = watchify('./game.js');
    bundler.on('update', rebundle);
    bundler.on('error', function(){
        util.error('Syntax error');
    })

    function rebundle() {
        return bundler.bundle()
            .pipe(source('game.js'))
            .pipe(gulp.dest('./public/js/'));
    }

    return rebundle();
});