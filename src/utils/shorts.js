module.exports = {
    encondeImageToBinary : image => {
        return new Buffer.from(image);
    },
    decodeBinaryImage : binaryImage => {
        return new Buffer.from(binaryImage);
    }
};