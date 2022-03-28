const fs = require('fs');

module.exports = {
    getFilesName : function (path) {              
        return fs 
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyObject : function(object, exception='object is null') {
        if (!object) {
            throw exception;  
        }
        return object;
    },

    encondeImageToBinary : function(image)  {
        return new Buffer.from(image);
    },

    decodeBinaryImage : function(binaryImage) {
        return new Buffer.from(binaryImage);
    }
}
