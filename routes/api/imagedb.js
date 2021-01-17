
let mongoose = require("mongoose");
const User = require("../../models/User");


const uploadImage = function (socket, imageObject, userID) {
  let imageID = mongoose.Types.ObjectId()
  console.log(imageID)
  User.updateOne(
    { _id: userID },
    { $push: { images: { data: imageObject.image, name: imageObject.name, contentType: 'image/png', _id: imageID } } },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        let newImageObject = {
            name: imageObject.name,
            image: imageObject.image,
            id: imageID
        }
        socket.send(JSON.stringify(newImageObject))
      }
    }
  );
}

const sendAllImages = function (socket, userID) {
  User.findOne({ _id: userID }).then((user) => {
    // Check if user exists
   for (image of user.images) {

    let imageObject = {
      name: image.name,
      image: image.data,
      id: image._id
    }
    socket.send(JSON.stringify(imageObject))
   }
  })
}



module.exports.uploadImage = uploadImage;
module.exports.sendAllImages = sendAllImages;

