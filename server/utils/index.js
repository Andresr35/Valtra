const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

/**
 *  grabs the client for the image container
 *
 * @return  {ContainerClient}  the client for images
 */
function getContainer() {
  // Quick start code goes here
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  //   // Create a unique name for the container
  const containerName = "fireball-images";

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  return containerClient;
}

async function main() {
  // Quick start code goes here
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  //   // Create a unique name for the container
  const containerName = "fireball-images";

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a unique name for the blob
  const blobName = "quickstart.txt";

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("\nUploading to Azure storage as blob:\n\t", blobName);

  // Upload data to the blob
  const data = "Hello, World!";
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody

  console.log("\nListing blobs...");

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log("\t", blob.name);
    console.log(blob.properties);
  }

  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  console.log("\nDownloaded blob content...");
  console.log(
    "\t",
    await streamToText(downloadBlockBlobResponse.readableStreamBody)
  );

  // Convert stream to text
  async function streamToText(readable) {
    readable.setEncoding("utf8");
    let data = "";
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
  }
}



// main()
//   .then(() => console.log("Done"))
//   .catch((ex) => console.log(ex.message));

module.exports = { getContainer,
 uploadBlobResponse:async(data,length,container) => {
  const blockBlobClient = container.getBlockBlobClient("ok");
  const response = await blockBlobClient.upload(data, length)
  console.log(response)
 }
};
