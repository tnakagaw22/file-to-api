const path = require('path');
const fs = require('fs');

const saveFileToDisk = (file, fileName) => {
    let fileNameWithTimestamp = `${path.parse(fileName).name}-${new Date().getTime()}${path.parse(fileName).ext}`; 

    var saveTo = path.join(__dirname, `../uploaded-files/${fileNameWithTimestamp}`);
    var outStream = fs.createWriteStream(saveTo);
    file.pipe(outStream);

}

module.exports = {
    saveFileToDisk
}