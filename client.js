var proxy_port  = process.argv[2];
var hub_port    = process.argv[3];
var name        = process.argv[4];
var socket      = require('socket.io-client');

// proxyへ接続
var proxy = socket.connect("http://localhost:"+proxy_port, { forceNew: true, transports: ['websocket']});
proxy.on('connect', function(){
  console.log('connected to proxy:'+proxy_port+' hub:'+hub_port);
  // 接続完了直後に、hubの情報を渡す
  proxy.emit('hub', hub_port);
});
proxy.on('message', function(msg){
  console.log(msg);
});

// コマンドラインから入力を受け取り、proxyへ通知
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', function(msg) {
  var n = name || proxy.id;
  proxy.emit('message', n+': '+msg);
});
reader.on('close', function() {
  proxy.disconnect();
});