const express = require("express");
const app = express();

// Configurations
var configs = require("./config.json");
var panelAddress = configs.panelAddress;

/**
 * WARNING - If the panel's server have a SSL encryption, add a "s" to "http://" in all response headers.
 */

// ExpressJS
app.use(express.static("www"));
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json());

app.get("/cpu", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://${panelAddress}/cpu`);
  require("os-utils").cpuUsage((v) => {
    return res.send(`${v.toString().slice(2, 4)}%`);
  });
});

app.get("/mem", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://${panelAddress}/mem`);
  return res.send(
    `${Math.floor(
      (100 * (require("os").totalmem() - require("os").freemem())) /
        require("os").totalmem()
    )}%`
  );
});

app.get("/disk", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://${panelAddress}/disk`);
  require("diskspace").check("C", (err, result) => {
    if (err) throw err;
    return res.send(
      `${Math.floor((100 * result.used) / parseInt(result.total))}%`
    );
  });
});

app.post("/cmd", (req, res) => {
  console.log(req.body.value);
  require("child_process").exec(req.body.value, (err, stdout, stderr) => {
    if (err) return res.send(err);
    if (stdout) return res.send(stdout);
    if (stderr) return res.send(stderr);
  });
});

app.listen(5500, "0.0.0.0", () => {
  console.log("Listening on 5500.");
});
