const express       = require("express");
const files         = require("./files/files.js");

const app       = express();
const port      = 5000;

app.listen(port, () => {
    app.use("/files", files);
    console.log("Server is live on port " + port);
})