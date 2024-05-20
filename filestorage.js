const Filestorage = require("@skalenetwork/filestorage.js");
const fs = require("fs");
const privateKey =
  "0x3ef725613746d3261ceda6e58e6c5f399f157cf971237cb026d5b97825105956";
const skale_chain_name = "fit-graffias";
const node_domain_name = "https://staging-v2.skalenodes.com/fs";
const directoryPath = "dist/developer";
const addressClean = "b4Ea99EA800E5f59fBA5e342aA3a1A07cB59A074";
const address = "0x" + addressClean;
const addressMinter = "0x" + addressClean;
const webPath = `${node_domain_name}/${skale_chain_name}/`;

let filestorage = new Filestorage(
  `https://staging-v2.skalenodes.com/v1/${skale_chain_name}`
);
const reservedSpace = 3 * 10 ** 8;
const files = fs.readdirSync(directoryPath);

const reserveSpace = async () => {
  console.log("reserving space");
  const reservedSpace = 3 * 10 ** 8;
  await filestorage.grantAllocatorRole(addressMinter, address, privateKey);
  await filestorage.reserveSpace(
    addressMinter,
    address,
    reservedSpace,
    privateKey
  );
  console.log("reserved space for:" + address);
};

async function get() {
  try {
    const directory = await filestorage.listDirectory(addressClean);

    return directory.map((file) => {
      return {
        ...file,
        webPath: `${webPath}${file.storagePath.toLowerCase()}`,
      };
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
}

async function clear() {
  const directory = await get();
  for (let i = 0; i < directory.length; i++) {
    const entity = directory[i];
    if (entity.isFile) {
      await filestorage.deleteFile(address, entity.name, privateKey);
      console.log(`${entity.name} was successfuly deleted`);
    }
  }
}
async function uploadIndex() {
  try {
    await filestorage.deleteFile(address, "index.html", privateKey);
    const file = await fs.readFileSync(directoryPath + "/index.html");

    await filestorage.uploadFile(address, "index.html", file, privateKey);
    console.log("Index updated");
  } catch (error) {
    console.log("Error:", error);
  }
}
async function upload() {
  try {
    // Owner must reserve space to an address
    // await filestorage.reserveSpace(address, address, reservedSpace, privateKey);
    await reserveSpace();

    console.log("RESERVE seems to work");
    for (let i = 0; i < files.length; ++i) {
      let content;
      let contentPath;

      try {
        content = await fs.readFileSync(directoryPath + "/" + files[i]);
        console.log("File found", files[i]);
        contentPath = await filestorage.uploadFile(
          address,
          files[i],
          content,
          privateKey
        );
        console.log("File uploaded", contentPath);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
}

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  switch (arg) {
    case "--delete":
      clear();
      break;
    case "--upload":
      upload();
      break;
    case "--reuploadIndex":
      uploadIndex();
      break;
    case "--list":
      get().then(console.log);
      break;
    default:
      console.log(`Argument ${arg} was not found`);
      break;
  }
}

// upload();
