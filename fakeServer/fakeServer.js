const httpProxy = require('http-proxy');
const http = require('http');

httpProxy.createProxyServer({
  target: 'http://crm2.local'
}).listen(5000);




