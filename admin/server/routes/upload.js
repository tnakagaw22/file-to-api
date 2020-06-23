const express = require("express");
const router = express.Router();
const Busboy = require("busboy");

const { getClient } = require("./headerHelper");
const { saveFileToDisk } = require("../datasources/fileUploadDs");
const { getMappingDefinition } = require("../datasources/mappingDefinitions");

router.post("/:id", async (req, res) => {
  var busboy = new Busboy({
    headers: req.headers,
  });
  const mapping = await getMappingDefinition(getClient(req), req.params.id);

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    file.on("data", function (data) {
      //   console.log("File [" + fieldname + "] got " + data.length + " bytes");
      // console.log(data.toString())
      // process data
    });
    file.on("end", function () {
      console.log("File [" + fieldname + "] Finished");
    });
    saveFileToDisk(file, filename);
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
