const sharp = require('sharp')
const imagedb = require("./imagedb");


//validates and executes edit type. Edit functions send edited version back to client
function edit(socket, imageData) {
    if (imageData.type === "resize") {
        resize(socket, imageData)
    } 
    else if (imageData.type === "grey") {
        greyscale(socket, imageData)
    }
    else if (imageData.type === "tint") {
        tint(socket, imageData)
    }
}

//creates buffer from base64 image data. Buffer needed for spark.js
function createBuffer(base64Data) {
    const uri = base64Data.split(';base64,').pop()
    return Buffer.from(uri, 'base64');
}

//Called from imagedb.uploadImage. Creates a low resolution preview image and sends it back to be uploaded
function createPreview(socket, imageObject, userID) {
    sharp(createBuffer(imageObject.image))
    .resize({width: 200})
    .toBuffer()
    .then(data => {
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        imageObject.image = header + base64data
        imagedb.uploadPreview(socket, imageObject, userID)
    })
    .catch(err => console.log(`downisze issue ${err}`));
}

function resize(socket, imageData) {
    sharp(createBuffer(imageData.image))
    .resize(52, 52)
    .toBuffer()
    .then(data => {
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        let imageObject = {
            image: header + base64data,
            id: imageData.id,
            edited: true
        }
        socket.send(JSON.stringify(imageObject))
    })
    .catch(err => console.log(`downisze issue ${err}`));
} 

function greyscale(socket, imageData) {
    sharp(createBuffer(imageData.image))
    .greyscale(true)
    .toBuffer()
    .then(data => {
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        let imageObject = {
            image: header + base64data,
            id: imageData.id,
            edited: true
        }
        socket.send(JSON.stringify(imageObject))
    })
    .catch(err => console.log(`downisze issue ${err}`));
} 

function tint(socket, imageData) {
    sharp(createBuffer(imageData.image))
    .tint({r: 112, g: 24, b: 24})
    .toBuffer()
    .then(data => {
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        let imageObject = {
            image: header + base64data,
            id: imageData.id,
            edited: true
        }
        socket.send(JSON.stringify(imageObject))
    })
    .catch(err => console.log(`downisze issue ${err}`));
} 




module.exports.edit = edit
module.exports.createPreview = createPreview