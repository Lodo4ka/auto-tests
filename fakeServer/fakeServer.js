const httpProxy = require("http-proxy");
const http = require("http");

let proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  proxy.web(
    (req,
    res,
    {
      target: "http://crm2proxy.local"
    })
  );
});

server.listen(7001, err => {
  if (err) {
    throw err;
  }
  console.log("Server started");
});
