/**
 * test out makinga n object into a stream and sending it to azure container
 *
 * @param   {[type]}  node-fetch  [node-fetch description]
 *
 * @return  {[type]}              [return description]
 */
const fetch = require("node-fetch");
const container = require("../utils/index");
const containerClient = container.getContainer();
const stream = require("stream");

async function test() {
  //fetching an image
  var res = await fetch(
    "https://storageaccount4valtra.blob.core.windows.net/fireball-images/HAAS%20Grades.png");

  const blockBlobClient = containerClient.getBlockBlobClient(res.url);
  const uploadBlobResponse = await blockBlobClient.upload(
    res.body,
    res.body._readableState.length,
    { blobHTTPHeaders: { blobContentType: "image" } }
  );
  console.log(uploadBlobResponse);
}

test();
