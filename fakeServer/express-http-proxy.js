const proxy = require("express-http-proxy");
const app = require("express")();
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();
const url = require("url");

app.use("*", proxy("crm2.local"));

// app.get("app1", function(req, res) {
//   res.send("HEllo world From Server 1");
// });

// app.post(
//   "/sections/sales/resident/bonuscalc/planmanagment/seasonality",
//   function(req, res) {
//     console.log(res);
//   }
// );
app.listen(7001, () => {
  `App is now runnig on port ${70001}`;
});

// app.all("/rest", (req, res) => {

// });

// app.get("/api/", function(req, res) {
//   apiProxy.web(req, res, {target: "http://google.com:80"});
// });
