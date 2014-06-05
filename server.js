var express = require('express');
var app = express();
var router = express.Router();
router.use(express.static(__dirname + '/public'));
app.use('', router);
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

io.on('connection', function (socket) {
  socket.emit('reload', { body: 'console.log("!!!");' });
  socket.on('feedback', function (data) {
    console.log(data);
  });
});