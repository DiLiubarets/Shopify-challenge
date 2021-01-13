require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const ws = require("ws");


// DB Config
const dbCred = require("./config/dev");

const users = require("./routes/api/users");
const { db } = require("./models/User");

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb+srv://diLiu:Ukrayina91@cluster0.t7tmk.mongodb.net/Shopify?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket, req) => {

});

// Routes
app.use("/api/users", users);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

const server = app.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);
server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
