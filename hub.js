var port    = process.argv[2];
var io      = require('socket.io')(port);

console.log("hub on "+port);

var proxies = {}
io.on('connection', function (socket) {
    console.log("connected:"+socket.id);
    proxies[socket.id] = socket;
    socket.on('disconnect', function () {
        delete proxies[socket.id];
        console.log("disconnected:"+socket.id);
    });

    // messageをproxyへbroadcast
    socket.on('message', function(msg){
        console.log('receive message:'+msg);
        Object.keys(proxies).forEach(function(key) {
            var proxy = proxies[key];
            proxy.emit('message', msg);
            console.log('send to '+proxy.id+' message:'+msg);
        });
    });
});
