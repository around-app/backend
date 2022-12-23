const util = require("util");
const { exec } = require("child_process");

const execAsync = util.promisify(exec);

(async () => {
  let seconds = 0;
  const interval = setInterval(() => {
    seconds += 1;
    console.clear();
    console.log(`Building services (${seconds} seconds)...`);
  }, 1000);
  const { error } = await execAsync(`docker compose up --build -d`);
  clearInterval(interval);
  if (error) {
    console.log("Error while starting docker");
    console.log(error);
    process.exit(1);
  }
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  console.log(`Build completed in ${min} min ${sec} sec`);
  console.log("Services running in detached mode.");
})();
