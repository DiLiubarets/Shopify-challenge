const express = require("express");
const router = express.Router();
const User = require("../../models/User");

let socketObject = {};

router.post("/update", (req, res) => {
  const apiKey = req.body.apiKey;
  const value = req.body.value;
  console.log(apiKey, value);

  if (socketObject[apiKey]) {
    socketObject[apiKey].send(value);
  } else {
    console.log("no socket")
  }

  User.updateOne(
    { apiKey: apiKey },
    { $push: { sensorData: { value: value, timestamp: Date.now() } } },
    function (err, docs) {
      if (err) {
        console.log(err);
      }
    }
  );
});

const socketSetter = function (apiKey, websocket) {
  socketObject[apiKey] = websocket;
};

const socketCleaner = function (apiKey) {
  if (socketObject[apiKey]) {
    socketObject[apiKey].close();
    delete socketObject[apiKey];
  }
};

const socketGetter = function (apiKey) {
  return socketObject[apiKey];
};
const sendHistoricalData = function (apiKey, params) {
  if (socketObject[apiKey]) {
    User.aggregate(
      [
        { $match: { apiKey: apiKey } },
        {
          $project: {
            sensorData: {
              $filter: {
                input: "$sensorData",
                as: "data",
                cond: {
                  $and: [
                    { $gte: ["$$data.timestamp", params.start] },
                    { $lte: ["$$data.timestamp", params.stop] },
                  ],
                },
              },
            },
          },
        },
        { $project: { "sensorData._id": 0 } },
      ],
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          if (docs[0]) {
            //console.log(docs[0].sensorData)
            socketObject[apiKey].send(
              JSON.stringify({ historicalData: docs[0].sensorData })
            );
          } else {
            socketObject[apiKey].send(JSON.stringify({ historicalData: {} }));
          }
        }
      }
    );
  }
};

module.exports = router;
module.exports.socketSetter = socketSetter;
module.exports.socketCleaner = socketCleaner;
module.exports.socketGetter = socketGetter;
module.exports.sendHistoricalData = sendHistoricalData;
