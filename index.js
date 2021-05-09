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

// This is the handler for CPU usage.
app.get("/cpu", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://${panelAddress}/cpu`);
  require("os-utils").cpuUsage((v) => {
    return res.send(`${v.toString().slice(2, 4)}%`);
  });
});

// This is the handler for RAM usage.
app.get("/mem", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://${panelAddress}/mem`);
  return res.send(
    `${Math.floor(
      (100 * (require("os").totalmem() - require("os").freemem())) /
        require("os").totalmem()
    )}%`
  );
});

// This is the handler for Disk usage.
app.get("/disk", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `http://${panelAddress}/disk`);
  require("diskspace").check("C", (err, result) => {
    if (err) throw err;
    return res.send(
      `${Math.floor((100 * result.used) / parseInt(result.total))}%`
    );
  });
});

// This is the handler for starting your service.
app.post("/start", (req, res) => {
  // console.log("start");
  require("child_process").execFile(
    `${__dirname}/scripts/start.bat`,
    (err, stdout, stderr) => {
      if (err) res.send(err);
      if (stdout) res.send(stdout);
      if (stderr) res.send(stderr);
    }
  );
});

// This is the handler for stopping your service.
app.post("/stop", (req, res) => {
  // console.log("stop");
  require("child_process").execFile(
    `${__dirname}/scripts/stop.bat`,
    (err, stdout, stderr) => {
      if (err) res.send(err);
      if (stdout) res.send(stdout);
      if (stderr) res.send(stderr);
    }
  );
});

// If you want the server to run in Localhost only, make sure that "0.0.0.0" is replaced to "127.0.0.1" or "localhost"
app.listen(5500, "0.0.0.0", () => {
  console.log("Listening on 5500.");
});
