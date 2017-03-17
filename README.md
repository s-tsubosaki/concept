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

* chat_client
```
node chat_client.js $proxyaddr:port $hubaddr:port $name
```
