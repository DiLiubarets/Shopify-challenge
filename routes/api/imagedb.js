
let mongoose = require("mongoose");
const User = require("../../models/User");
const editor = require("./editor");


//upload image, create preview in editor, send preview from editor back to editor.uploadPreview
const uploadImage = function (socket, imageObject, userID) {
  let imageID = mongoose.Types.ObjectId()
  console.log(imageID)
  User.updateOne(
    { _id: userID },
    { $push: { images: { data: imageObject.image, name: imageObject.name, contentType: 'image/png', _id: imageID }, imageIDS: { id: imageID } } },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        let newImageObject = {
            name: imageObject.name,
            image: imageObject.image,
            id: imageID
        }
        editor.createPreview(socket, newImageObject, userID)
      }
    }
  );
}

//Called from editor. Uploads the generated preview and sends it to client
const uploadPreview = function (socket, imageObject, userID) {
  User.updateOne(
    { _id: userID },
    { $push: { previewImages: { data: imageObject.image, _id: imageObject.id }}},
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        let newImageObject = {
            image: imageObject.image,
            id: imageObject.id,
            uploaded: true
        }
        socket.send(JSON.stringify(newImageObject))
      }
    }
  );
}

//loads document of all image id's, finds and sends each preview images back to client asyncronously
const sendAllImages = function (socket, userID) {

  User.findOne({_id: userID}).select('imageIDS').then((imageIDS) => {
    for (imageID of imageIDS.imageIDS) {
      User.findOne({_id: userID}).select({ previewImages: {$elemMatch: {_id: imageID.id}}}).then((image) => {
        let imageObject = {
          image: image.previewImages[0].data,
          id: image.previewImages[0]['_id'],
        }
        socket.send(JSON.stringify(imageObject))
      })
    }
  })
}

//sends high quality image back to client to load editor
const getImage = function (socket, imageObject, userID) {
  User.findOne({_id: userID}).select({ images: {$elemMatch: {_id: imageObject.previewID}}}).then((image) => {
    let imageData = {
      image: image.images[0].data,
      id: image.images[0]['_id'],
      name: image.images[0].name,
      hq: true
    }
    socket.send(JSON.stringify(imageData))
  })
}

const deleteImage = function (socket, imageObject, userID) {
  let imageID = imageObject.deleteID
  User.updateOne(
    { _id: userID },
    { $pull: { images: { _id: imageID }, imageIDS: { id: imageID }, previewImages : {_id: imageID} } },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        socket.send(JSON.stringify({deletedID: imageID}))
      }
    }
  );
}

module.exports.deleteImage = deleteImage;
module.exports.getImage = getImage;
module.exports.uploadImage = uploadImage;
module.exports.sendAllImages = sendAllImages;
module.exports.uploadPreview = uploadPreview;

