var port    = process.argv[2];

var hub_socket      = require('socket.io-client');
var client_socket   = require('socket.io')(port);

var client2hub = {};
var hub2client = {};
client_socket.on('connection', function(socket){
    // clientからhubの情報を受け取ったら、hubへ接続(client,hubからそれぞれを逆引きできるように)
    socket.on('hub', function(hubport){
        var hub = hub_socket.connect("http://localhost:"+hubport, { forceNew: true, transports: ['websocket']});
        client2hub[socket.id]   = hub;
        hub2client[hub.id]      = socket;
        hub.on('connect', function(){
            console.log("client connected to hub... client:"+socket.id+" hub:"+hub.id);
        });
        // hubからclientへ
        hub.on('message', function(msg){
            socket.emit('message', msg);
        });
    });

    // clientからhubへ
    socket.on('message', function(msg){
        console.log('receive message:'+msg);
        var hub = client2hub[socket.id];
        hub.emit('message', msg);
    })

    socket.on('disconnect', function(){
        var hub = client2hub[socket.id];
        console.log("client disconnected from hub... client:"+socket.id+" hub:"+hub.id);
        hub.disconnect();
        delete client2hub[socket.id];
        delete hub2client[hub.id];
    });
});
