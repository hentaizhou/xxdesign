var net = require('net')
var tcp_server = net.createServer() // 创建 tcp server
var wsS = require('./ws')

var Sockets = undefined
var ws_socket = wsS.ws_server()

var subStr_S = ''
var subStr_T = ''
var subStr_M = ''

// 监听 端口
tcp_server.listen(8003, function() {
  console.log('tcp_server listening 8003')
})

// 处理客户端连接
tcp_server.on('connection', function(socket) {
  console.log('客户端地址', socket.address())
  Sockets = socket
  DealConnect(socket)
})

tcp_server.on('error', function() {
  console.log('tcp_server error!')
})

tcp_server.on('close', function() {
  console.log('tcp_server close!')
})

// 处理每个客户端消息
function DealConnect(socket) {
  socket.on('data', function(data) {
    data = data.toString()
    // 向所有客户端广播消息
    //  for(var i in Sockets){
    //      Sockets[i].write(data);
    //  }
    // socket.write(data);
    console.log('received data ', data)
    // 将获得的数据传给ws emit 发送到web端
    let str = data
    subStr_S = str.match(/S:(\S*:)/)
    subStr_T = str.match(/T:(\S*)M/)
    subStr_M = str.match(/M:(\S*)/)
    let mcuDatas = `${subStr_S},${subStr_T},${subStr_M}`
    // 格式  S:0T:2501M:075
    ws_socket.emit('datas', mcuDatas)
  })

  // 客户端正常断开时执行
  socket.on('close', function() {
    console.log('client disconneted!')
  })
  // 客户端正异断开时执行
  socket.on('error', function(err) {
    console.log('client error disconneted!')
  })
}
