import { config as dotenvConfig } from "dotenv";

export default defineNitroPlugin(() => {
  dotenvConfig({ quiet: true });
});
