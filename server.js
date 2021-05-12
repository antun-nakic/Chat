const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1201564",
  key: "42ad0b9050bf33f88f75",
  secret: "d9df89a4bccb6b5880ef",
  cluster: "eu",
  useTLS: true,
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
  console.log("Autentifikacija");
});

const port = process.env.PORT || 5000;
console.log(`Stranica se vrti na http://localhost:${port}/`);
app.listen(port);
