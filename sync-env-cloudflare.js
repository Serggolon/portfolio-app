import fs from "fs";
import path from "path";
 
//ENV variables can be read from github secrets in .github/workflows/deploy.yaml and set during build time on Gitub Actions to ENV files by this script
const root = process.cwd();

if (process.env.NEXT_PRIVATE_LOCAL_WEBPACK) {
  console.log("[sync-env-cloudflare] NEXT_PRIVATE_LOCAL_WEBPACK is set");
} else {
  console.warn("[sync-env-cloudflare] NEXT_PRIVATE_LOCAL_WEBPACK is missing!");
}

// ENV keys to sync
// const ENV_KEYS = [
//   "NODE_ENV",
//   "CF_NEXT_PRIVATE_LOCAL_WEBPACK",
//   "NEXT_PUBLIC_FEATURE_BETA",
//   "NEXT_PUBLIC_HOME_PROFILE_URL",
//   "NEXT_PUBLIC_BACKEND_URL",
//   "NEXT_PUBLIC_API_URL",
//   "NEXT_PUBLIC_SHELL_URL",
//   "NEXT_PUBLIC_PROFILE_URL",
// ];
console.log("Syncing env for Cloudflare Workers... , keys:", process.env);

// const envText = ENV_KEYS.map((key) => `${key}=${process.env[key] ?? ""}`).join(
//   "\n"
// );

const envText =
  `NODE_ENV=${process.env.NODE_ENV}\n` +
  `NEXT_PRIVATE_LOCAL_WEBPACK=${process.env.NEXT_PRIVATE_LOCAL_WEBPACK}\n` +
  `NEXT_PUBLIC_FEATURE_BETA=${process.env.NEXT_PUBLIC_FEATURE_BETA}\n` +
  `NEXT_PUBLIC_HOME_PROFILE_URL=${process.env.NEXT_PUBLIC_HOME_PROFILE_URL}\n`;

console.log("Generated env:\n", envText);

// Find all microfrontend-folders
const dirs = fs.readdirSync(root).filter((f) => f.startsWith("mf-"));

// Write .env files
dirs.forEach((folder) => {
  const envPath = path.join(root, folder, ".env");

  fs.writeFileSync(envPath, envText);
  console.log(`✔ Written env to: ${envPath}`);
});
