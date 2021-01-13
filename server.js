require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const ws = require("ws");


// DB Config
const dbCred = require("./config/dev");
const stripe = require("stripe")(process.env.stripe || dbCred.stripe);

const users = require("./routes/api/users");
const sensor = require("./routes/api/sensor");
const { db } = require("./models/User");

const app = express();
const port = process.env.PORT || 5000;

// Stripe
const YOUR_DOMAIN = "http://mern-co2-tracker.herokuapp.com/checkout" || "http://localhost:3000/checkout";

app.post("/create-session", async (req, res) => {
  console.log("/create-session")
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 39900,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

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

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket, req) => {
  let key = req.url.substring(6, req.url.length);
  sensor.socketSetter(key, socket);
  console.log(key, "opened");
  socket.on("close", () => {
    console.log(key, "closed");
    sensor.socketCleaner(key);
  });
  socket.on("message", (params) => {
    sensor.sendHistoricalData(key, JSON.parse(params));
  });
});

// Routes
app.use("/api/users", users);
app.use("/api/sensor", sensor);

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
