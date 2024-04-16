const fs = require("fs");
const port0 = process.env.PORT0;
const scriptPath = "./public/tracker.js";

let script = fs.readFileSync(scriptPath, "utf8");
script = script.replace("%%PORT0%%", port0);

fs.writeFileSync(scriptPath, script);
