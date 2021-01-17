const sharp = require('sharp')

function edit(socket, imageData, type) {
    if (type === "resize") {
        resize(socket, imageData)
    } 
    else if (type === "grey") {
        greyscale(socket, imageData)
    }
    else if (type === "tint") {
        tint(socket, imageData)
    }
}

function createBuffer(base64Data) {
    const uri = base64Data.split(';base64,').pop()
    return Buffer.from(uri, 'base64');
}

function resize(socket, imageData) {
    sharp(createBuffer(imageData))
    .resize(52, 52)
    .toBuffer()
    .then(data => {
        //console.log(data)
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        let imageObject = {
            image: header + base64data,
            edited: true
        }
        socket.send(JSON.stringify(imageObject))
    })
    .catch(err => console.log(`downisze issue ${err}`));
} 

function greyscale(socket, imageData) {
    sharp(createBuffer(imageData))
    .greyscale(true)
    .toBuffer()
    .then(data => {
        //console.log(data)
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        let imageObject = {
            image: header + base64data,
            name: imageData.name,
            id: imageData.id,
            edited: true
        }
        socket.send(JSON.stringify(imageObject))
    })
    .catch(err => console.log(`downisze issue ${err}`));
} 

function tint(socket, imageData) {
    sharp(createBuffer(imageData))
    .tint({r: 112, g: 24, b: 24})
    .toBuffer()
    .then(data => {
        //console.log(data)
        let base64data = Buffer.from(data).toString('base64')
        let header = 'data:image/jpeg;base64,'
        let imageObject = {
            image: header + base64data,
            name: imageData.name,
            id: imageData.id,
            edited: true
        }
        socket.send(JSON.stringify(imageObject))
    })
    .catch(err => console.log(`downisze issue ${err}`));
} 




module.exports.edit = edit