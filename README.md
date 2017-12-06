# Request-Logger
Request Logger is a simple proxy, that is able to log all requests and responses from and to a target-server.

## Build Setup

``` bash
# install dependencies
npm install

# DEFAULT CASE: start the proxy on port 3120 and with target server localhost:8088
npm run proxy


# CUSTOM CASE: start the proxy on custom port (9000) and target to localhost:9100 
PORT=9000 SERVER="localhost:9100" npm run proxy.js

# PROXY DEBUG: run the proxy server and a simple test server
npm run proxy (starts on 3120 with localhost:3121 as SERVER)
// in a new window
npm run testserver (starts an express server on localhost:3121)
```
