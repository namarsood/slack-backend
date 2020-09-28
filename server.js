const express = require("express"),
  app = express(),
  cors = require("cors"),
  responseTime = require("response-time");


app.use(
  responseTime(function (req, res, time) {
    console.log(`${req.method} ${res.statusCode} ${req.url}`, time, "ms");
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Welcome to Slack Server");
});

const server = app.listen(3000, () => {
    console.log("server is running on port ", 3000);
  });

  process.on("SIGINT", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    server.close(() => {
      console.log("Http server closed.");
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    server.close(() => {
      console.log("Http server closed.");
      process.exit(0);
    });
  });
