const fs = require("fs");

// Read env
const port0 = process.env.PORT0;

// Init values
const fileName = "1.html";
const initPath = `./init/${fileName}`;
const publicFolder = "./public";
const finalPath = `${publicFolder}/${fileName}`;

// Read file
let script = fs.readFileSync(initPath, "utf8");
// Insert into file env values
script = script.replace("%%SERVER_URL%%", port0);

// create folder
fs.mkdirSync(publicFolder, { recursive: true });
// create new file
fs.writeFileSync(finalPath, script);
