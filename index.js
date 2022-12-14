const { env } = process;
env.UV_THREADPOOL_SIZE = 1;
const { isMaster, fork } = require("cluster");
console.log("cluster.isMaster", isMaster);
// Is the file being executed in master mo de?
if (isMaster) {
  // Cause index.js to be executed *again* but in child mode
  fork();
  fork();
  // cluster.fork();
  // cluster.fork();
} else {
  // I'm a child, I'm going to act like a server and do nothing else
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(15000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3001);
}
