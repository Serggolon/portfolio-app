import fs from "fs";
import path from "path";

const root = process.cwd();

// Список переменных, которые нужны микрофронтендам
const ENV_KEYS = [
  "NODE_ENV",
  "NEXT_PRIVATE_LOCAL_WEBPACK",
  "NEXT_PUBLIC_HOME_PROFILE_URL",
  "NEXT_PUBLIC_BACKEND_URL",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_SHELL_URL",
  "NEXT_PUBLIC_PROFILE_URL",
];

// Собираем .env текст
const envText = ENV_KEYS
  .map((key) => `${key}=${process.env[key] ?? ""}`)
  .join("\n");

console.log("Generated env:\n", envText);

// Находим все mf-* папки
const dirs = fs.readdirSync(root).filter((f) => f.startsWith("mf-"));

// Записываем в каждую microfrontend-папку
dirs.forEach((folder) => {
  const envPath = path.join(root, folder, ".env");

  fs.writeFileSync(envPath, envText);
  console.log(`✔ Written env to: ${envPath}`);
});
