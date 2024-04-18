const fs = require("fs");

const port0 = process.env.PORT0;
const fileName = "tracker.js";
const initPath = `./generated/${fileName}`;
const publicFolder = "./public";
const finalPath = `${publicFolder}/${fileName}`;

let script = fs.readFileSync(initPath, "utf8");
script = script.replace("%%PORT0%%", port0);

fs.mkdirSync(publicFolder, { recursive: true });
fs.writeFileSync(finalPath, script);
