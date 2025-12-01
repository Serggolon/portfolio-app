const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
console.log(process.env.NODE_ENV, '<<=====================sync-env');
// Allowed env variable prefixes to be injected into microfrontends
const ALLOWED_PREFIXES = [
  "NEXT_PUBLIC_",
  "NEXT_PRIVATE_LOCAL_WEBPACK",
  "NODE_ENV",
  "API_",
  "SECRET_",
  "JWT_",
];

const currentEnv = process.env.NODE_ENV;

if (!currentEnv) {
  throw new Error(
    "Error source: ./sync-env.js; Error message: NODE_ENV is not set!"
  );
}

//1 FORM RESULTING ENV FOR ALL MICROFRONTENDS
const mainEnvPath = path.resolve(__dirname, ".env");
let currentEnvPath = "";

//1.1 Determining current env file path
switch (currentEnv) {
  case "development":
    currentEnvPath = path.resolve(__dirname, ".env.development");

    break;
  case "production":
    currentEnvPath = path.resolve(__dirname, ".env.production");

    break;
  case "test":
    currentEnvPath = path.resolve(__dirname, ".env.test");

    break;
}

//1.2 Checking if env files exist
const isMainEnvExists = fs.existsSync(mainEnvPath);
const isCurrentEnvExists = fs.existsSync(currentEnvPath);

//1.3 Throwing error if any of the env files is missing (except production env file Cloudflare Workers case)
if (!isCurrentEnvExists || !isMainEnvExists) {
  throw new Error(
    `Error source: ./sync-env.js; Error message: ${
      isMainEnvExists ? "" : mainEnvPath
    }  ${!isCurrentEnvExists && !isMainEnvExists ? ", " : ""} ${
      isCurrentEnvExists ? "" : currentEnvPath
    } file(s) not found!`
  );
}

//1.4 Loading env files
dotenv.config({ path: currentEnvPath }); // !!! loading current env file first to have its variables override main .env file variables
dotenv.config({ path: mainEnvPath });

//2 FILTERING ENV VARIABLES TO INJECT ONLY NEEDED ONES
const filteredEnv = Object.entries(process.env)
  .filter(([key]) => ALLOWED_PREFIXES.some((prefix) => key.startsWith(prefix)))
  .map(([key, value]) => `${key}="${value}"`)
  .join("\n");

// 3 ADDING ENV FILE TO EACH MICROFRONTEND PACKAGE
const rootDir = path.resolve(__dirname);

// 3.1 Getting all microfrontend folders names
const mfFolderNames = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith("mf-"))
  .map((dirent) => dirent.name);

// 3.2 Writing filtered env to each microfrontend .env file
mfFolderNames.forEach((folderName) => {
  const mfEnvPath = path.join(rootDir, folderName, ".env");

  fs.writeFileSync(mfEnvPath, filteredEnv, { encoding: "utf8" });

  console.log(`✔ Written env to: ${mfEnvPath}`);
});
