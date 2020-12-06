const express = require("express");
const errorHandler = require("./helpers/errorHandler");
const cors = require("cors");
const { getTimestamp } = require("./helpers/getTimestamp");
const { checkForValidDate, getNumHyphens } = require("./helpers/dateValidator");
const app = express();
const PORT = process.env.PORT || 8080;
app.set("port", PORT);
app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);

app.use(express.static(__dirname + "/style"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/html/index.html");
});
app.use("/api/timestamp/:date", function (req, res, next) {
  const dateParam = req.params.date;
  if (checkForValidDate(dateParam) === false) {
    let err = new Error("Invalid Date");
    err.status = 500;
    next(err);
  }
  next();
});
app.get("/api/timestamp/:date", function (req, res) {
  const timeStamp =
    getNumHyphens(req.params.date.split("")) !== 2
      ? getTimestamp(false, parseInt(req.params.date))
      : getTimestamp(true, req.params.date);

  res.json(timeStamp);
});
app.use("/api/timestamp/", function (req, res, next) {
  const dateParam = req.query.timestamp;
  if (dateParam === undefined) {
    next();
  } else if (checkForValidDate(dateParam) === false) {
    let err = new Error("Invalid Date");
    err.status = 500;
    next(err);
  }
  next();
});
app.get("/api/timestamp/", function (req, res) {
  const request = req.query.timestamp || Date.now().toString();
  const timeStamp =
    getNumHyphens(request.split("")) !== 2
      ? getTimestamp(false, parseInt(request))
      : getTimestamp(true, request);

  res.json(timeStamp);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`we connnected on port ${PORT}`);
});
