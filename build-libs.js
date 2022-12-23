const util = require("util");
const path = require("path");
const { exec } = require("child_process");
const { readdir, unlink, rm } = require("fs/promises");

const execAsync = util.promisify(exec);

const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

(async () => {
  const libsDir = path.join(__dirname, "libs");
  const allLibs = await getDirectories(libsDir);
  console.log("Starting building libs...\r\n");
  for (lib of allLibs) {
    const libPath = path.join(libsDir, lib);

    const files = await getFiles(libPath);
    for (file of files) {
      const isNeedToDelete = `${file}`.match(/^.*(\.js|\.d\.ts)$/i);
      if (isNeedToDelete) {
        await unlink(path.join(libPath, file));
      }
    }
    await rm(path.join(libPath, "node_modules"), {
      recursive: true,
      force: true,
    });

    console.log(`\tBuilding ${lib}...\r\n`);
    const { error, stdout } = await execAsync(
      `cd ${libPath}/ && npm install && npm run build`
    );
    if (error) {
      console.log(`\t\tError: ${lib}.\r\n`);
      console.log(error);
    } else {
      console.log(`\t\tSuccess: ${lib}\r\n`);
      console.log(stdout);
    }
  }
  console.log("Building libs completed\r\n");
})();
