let net = require('net')

let TcpServer = net.createServer(function(socket) {
  console.log(socket)
})

TcpServer.listen(8003, function() {
  console.log('Creat server on http://127.0.0.1:8003/')
})
