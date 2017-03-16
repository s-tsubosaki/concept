# 概要
proxyはclientごとに用意するのではなく、1つのモデル  
(clientからproxyへ接続するときに、hubの情報を与える)

* hub
```
node hub.js $hub_port
```

* proxy
```
node proxy.js $proxy_port
```

* client
```
node client.js $proxy_port $hub_port $name
```
