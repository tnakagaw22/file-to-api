const express = require("express");
const router = express.Router();
const Busboy = require("busboy");

const { getClient } = require("./headerHelper");
const { saveFileToDisk, addToQueue } = require("../datasources/fileUploadDs");
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
    await saveFileToDisk(file, filename);
    // addToQueue(filename)
    const payload = {
      mapping: JSON.stringify(mapping),
      fileName: filename
    };
    console.log(`payload : ${payload}`)
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
