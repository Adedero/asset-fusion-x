import { CronJob } from "cron";
import distributeProfit from "../utils/distribute-profit";

export default defineNitroPlugin(() => {
  new CronJob(
    "*/30 * * * *",
    async function () {
      await distributeProfit();
    },
    null, // onComplete
    true // start
  );
});
