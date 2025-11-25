declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_VERSION: string;
    NEXT_PUBLIC_BACKEND_URL: string;
    NEXT_PUBLIC_SHELL_URL: string;
    NEXT_PUBLIC_HOME_PROFILE_URL: string;
    NEXT_PUBLIC_FEATURE_BETA: "true" | "false" | "1" | "0";

    API_SECRET_KEY: string;
    JWT_PRIVATE_KEY: string;
  }
}
