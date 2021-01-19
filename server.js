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
const imagedb = require("./routes/api/imagedb");
const editor = require("./routes/api/editor");



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
    process.env.MONGODB_URI,
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


//main server function controlled from here
const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket, req) => {
  let key = req.url.substring(6, req.url.length)
  console.log(key, "opened");
  imagedb.sendAllImages(socket, key); //send all previews to client 
  socket.on("message", (data) => {
    let imageObject = JSON.parse(data)
    if (imageObject.type) {
      editor.edit(socket, imageObject) //send to editor
    } else if (imageObject.previewID) {
      imagedb.getImage(socket, imageObject, key) //send high quality version to client
    } else if (imageObject.deleteID) {
      imagedb.deleteImage(socket, imageObject, key)//delete image from db
    }
     else {
      imagedb.uploadImage(socket, imageObject, key) //upload original, create preview, upload preview
    }
  });
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
