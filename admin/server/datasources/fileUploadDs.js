const path = require('path');
const fs = require('fs');
const Queue  = require('bull');

const mappingQueue = new Queue('file mapping', 'redis://127.0.0.1:6379');

const saveFileToDisk = (file, fileName) => {
    let fileNameWithTimestamp = `${path.parse(fileName).name}-${new Date().getTime()}${path.parse(fileName).ext}`; 

    var saveTo = path.join(__dirname, `../uploaded-files/${fileNameWithTimestamp}`);
    var outStream = fs.createWriteStream(saveTo);
    file.pipe(outStream);

}

const addToQueue = (data) => {
    console.log('adding to queue')
    mappingQueue.add(data);
    console.log('added to queue')
}

module.exports = {
    saveFileToDisk,
    addToQueue
}