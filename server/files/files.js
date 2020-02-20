const express       = require("express");
const router        = express.Router();

// get request on <server>/files will send the list of files in <server>/files/.
router.get("/", function (req, res, next) {
    const fs        = require("fs");
    const dir       = __dirname;

    fs.readdir(dir, (err, files) => {
        let fileList    = "";
        if (err) console.log(err);
        else {
            files.forEach((file) => {
                const fileName = file;
                if (fileName.slice(file.length - 4) === ".dcm")
                    fileList += file + " ";
            });
            fileList.slice(0, fileList.length - 1);
            res.send(fileList);     
        }
    });
});

// get request on <server>/files/<filename> will send the file to the client.
router.get("/:name", (req, res, next) => {
    const fileName = __dirname + "/" + req.params.name;
    const options = {
        headers: {
            "x-timestamp" : Date.now(),
            "x-sent" : true
        }
    }
    res.sendFile(fileName, options, (err) => {
        if (err) next(err);
    });
});
  
module.exports = router;
