let proxy = require("express-http-proxy");
let app = require("express")();
const port = 7001;

app.post("/sections/sales/resident/bonuscalc/planmanagment/seasonality", function (req, res) {
  console.log("post form ", res.statusMessage());
});

app.use("*",function (req, res) {
  console.log(req.url);
  proxy("localhost:7000");
});

app.listen(port, () => {
  `Server listening porn on ${port}`;
});
