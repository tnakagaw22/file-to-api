const express = require("express");
const router = express.Router();
const Busboy = require("busboy");
const path = require("path");

const { getClient } = require("./headerHelper");
const { saveFileToDisk } = require("../datasources/fileUploadDs");
const { getMappingDefinition } = require("../datasources/mappingDefinitions");
const { publishToQueue } = require("../datasources/mqService");

router.post("/:id", async (req, res) => {
  var busboy = new Busboy({
    headers: req.headers,
  });
  const mapping = await getMappingDefinition(getClient(req), req.params.id);

  busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
    file.on("data", async (data) => {
      //   console.log("File [" + fieldname + "] got " + data.length + " bytes");
      // console.log('---' + data.toString())
      // await addToQueue(data.toString())
      // console.log('^^^^^^^');
      // process data
    });
    file.on("end", function () {
      // console.log("File [" + fieldname + "] Finished");
    });

    let fileNameWithTimestamp = `${
      path.parse(filename).name
    }-${new Date().getTime()}${path.parse(filename).ext}`;
  
      await saveFileToDisk(file, fileNameWithTimestamp);
    // addToQueue(filename)
    const payload = {
      mapping: mapping,
      fileName: fileNameWithTimestamp
    };
    console.log(`payload : ${JSON.stringify(payload)}`)
    await publishToQueue("process-uploaed-files", payload);
  });
  busboy.on("finish", function () {
    res.writeHead(200, {
      Connection: "close",
    });
    res.end("That's all folks!");
  });

  return req.pipe(busboy);
});

module.exports = router;
