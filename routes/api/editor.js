const sharp = require('sharp')
const imagedb = require("./imagedb");


//validates and executes edit type. Edit functions send edited version back to client
function edit(socket, imageData) {
    if (imageData.type === "resize") {
        resize(socket, imageData)
    } else if (imageData.type === "landscape") {
        landscape(socket, imageData)
    }
    else if (imageData.type === "rotate") {
        rotate(socket, imageData)
    }
    else if (imageData.type === "grey") {
        greyscale(socket, imageData)
    }
    else if (imageData.type === "warm") {
        warm(socket, imageData)
    }
    else if (imageData.type === "cold") {
        cold(socket, imageData)
    }
    else if (imageData.type === "green") {
        green(socket, imageData)
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
        .resize({ width: 200 })
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
        .resize(200, 200)
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

function landscape(socket, imageData) {
    sharp(createBuffer(imageData.image))
        .resize(1080, 608)
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

function rotate(socket, imageData) {
    sharp(createBuffer(imageData.image))
        .rotate(90)
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

function warm(socket, imageData) {
    sharp(createBuffer(imageData.image))
        .tint({r: 172, g: 112, b: 61})
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

function cold(socket, imageData) {
    sharp(createBuffer(imageData.image))
        .tint({r: 135, g: 206, b: 250})
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

function green(socket, imageData) {
    sharp(createBuffer(imageData.image))
        .tint({r: 127, g: 255, b: 0})
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