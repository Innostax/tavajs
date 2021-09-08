const { BlobServiceClient } = require ('@azure/storage-blob');
var multipart = require ("parse-multipart");

module.exports = async function (context ,req){
  var bodyBuffer = Buffer.from(req.body);
  var boundary = multipart.getBoundary(req.headers['content-type']);
  var parts = multipart.Parse(bodyBuffer, boundary);
  const BlobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const container = "";
  const containerClient = await BlobServiceClient.getContainerClient(container);
  const blobName = part[0].filename;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(parts[0].data,parts[0].data.length);
  context.res = { body :{name : parts[0].filename, type: parts[0].type, data: parts[0].data.length}};
  context.done();
}