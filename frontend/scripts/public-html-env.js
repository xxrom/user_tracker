const fs = require("fs");

// Read env
const envValue = "NEXT_PUBLIC_SERVER_URL";
const serverUrl = process.env[envValue];
const envPort0Value = "NEXT_PUBLIC_SERVER_PORT0";
const serverPort0 = process.env[envPort0Value];

// Init values
const fileNames = ["1.html", "2.html", "3.html"];

fileNames.forEach((fileName) => {
  const initFolder = "./init";
  const initPath = `${initFolder}/${fileName}`;
  const publicFolder = "./public";
  const finalPath = `${publicFolder}/${fileName}`;

  // Read file
  let file = fs.readFileSync(initPath, "utf8");
  // Insert into file env values
  file = file.replace(`%%${envValue}%%`, serverUrl);
  file = file.replace(`%%${envPort0Value}%%`, serverPort0);

  // create folder
  fs.mkdirSync(publicFolder, { recursive: true });
  // create new file
  fs.writeFileSync(finalPath, file);
});
