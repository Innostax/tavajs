const { BlobServiceClient } = require("@azure/storage-blob");
const path = require("path");
require("dotenv").config();

const { AZURE_STORAGE_CONNECTION_STRING } = process.env;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

async function createContainer(containerName) {
    try {
        const containerClient = await blobServiceClient.getContainerClient(containerName);
        // const createContainerResponse = await containerClient.create(); TODO
        console.log(`${containerName} container created successfully.`);
        return containerClient.url;
    } catch (err) {
        console.log(err);
    }
}

async function listContainers() {
    const containerList = [];
    const containers = await blobServiceClient.listContainers();
    for await (const container of containers) {
        containerList.push(container.name);
    }
    return containerList;
}

async function deleteContainer(containerName) {
    try {
        const deleteContainerResponse = await blobServiceClient.deleteContainer(containerName);
        console.log(`${containerName} container deleted successfully.`);
        return deleteContainerResponse;
    } catch (err) {
        console.log(err);
    }
}

async function uploadBlob(containerName, filePath) {
    try {
        filePath = path.resolve(filePath);
        const fileName = path.basename(filePath);
        const containerClient = await blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = await containerClient.getBlockBlobClient(fileName);
        const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
        console.log(`${fileName} blob uploaded successfully.`);
        return uploadBlobResponse;
    } catch (err) {
        console.log(err);
    }
}

async function listBLobs(containerName) {
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    const blobList = [];
    const blobs = await containerClient.listBlobsFlat();
    for await (const blob of blobs) {
        blobList.push(blob.name);
    }
    return blobList;
}

async function downloadBlob(containerName, blobName, filePath) {
    try {
        filePath = path.resolve(filePath);
        const containerClient = await blobServiceClient.getContainerClient(containerName);
        const blobClient = await containerClient.getBlobClient(blobName);
        const downloadBlobResponse = await blobClient.downloadToFile(filePath);
        console.log(`${blobName} blob downloaded successfully.`);
        return downloadBlobResponse;
    } catch (err) {
        console.log(err);
    }
}

async function deleteBlob(containerName, blobName) {
    try {
        const containerClient = await blobServiceClient.getContainerClient(containerName);
        const blobClient = await containerClient.getBlobClient(blobName);
        const deleteBlobResponse = await blobClient.delete();
        console.log(`${blobName} blob deleted successfully.`);
        return deleteBlobResponse;
    } catch (err) {
        console.log(err);
    }
}

async function sampleBlobServiceExecutor() {
    const containerName = "testing";
    const blobName = "index.js";
    const uploadFilePath = "./index.js";
    const downloadFilePath = "./copyOfIndex.js";

    await createContainer(containerName);
    console.log("Container List: ", await listContainers());
    await uploadBlob(containerName, uploadFilePath);
    console.log("Blob List: ", await listBLobs(containerName));
    await downloadBlob(containerName, blobName, downloadFilePath);
    await deleteBlob(containerName, blobName);
    await deleteContainer(containerName);
}

module.exports = {
    createContainer,
    listContainers,
    deleteContainer,
    uploadBlob,
    listBLobs,
    downloadBlob,
    deleteBlob,
    sampleBlobServiceExecutor,
};
