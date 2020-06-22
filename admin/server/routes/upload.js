const express = require("express");
const router = express.Router();
const Busboy = require("busboy");

router.post("/", async (req, res) => {
  var busboy = new Busboy({
    headers: req.headers,
  });

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    console.log("--file-");
    file.on("data", function (data) {
    //   console.log("File [" + fieldname + "] got " + data.length + " bytes");
    // console.log(data.toString())
    // process data 
    });
    file.on("end", function () {
      console.log("File [" + fieldname + "] Finished");
    });
    // var saveTo = path.join(__dirname, "dir", path.basename(filename));
    // var outStream = fs.createWriteStream(saveTo);
    // file.pipe(outStream);
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
