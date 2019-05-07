//服务器及页面响应部分
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server) //引入socket.io模块并绑定到服务器

app.use('/', express.static(__dirname + '/www'))
server.listen(8004)

var init_ws = function() {
  //socket部分
  io.on('connection', function(socket) {
    //接收并处理客户端发送的反控事件
    socket.on('control', function(data) {
      //将消息输出到控制台 
      console.log(data)
    })
    socket.emit('datas', 'test msg!!!!')
  })
  return 'init ok!'
}

module.exports = {
  ws_server: init_ws
}
