const {
    S3Client,
    CreateBucketCommand,
    ListBucketsCommand,
    DeleteBucketCommand,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsCommand,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const path = require("path");
const fs = require("fs");

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const createBucket = async (bucketName) => {
    try {
        const bucketParams = { Bucket: bucketName };
        const data = await s3Client.send(new CreateBucketCommand(bucketParams));
        console.log(`Successfully created bucket ${bucketName}.`);
        return data;
    } catch (err) {
        console.log(`Error creating bucket ${bucketName}.`, err);
    }
}

const listBuckets = async () => {
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        return data.Buckets;
    } catch (err) {
        console.log("Error listing buckets.", err);
    }
}

const deleteBucket = async (bucketName) => {
    try {
        const bucketParams = { Bucket: bucketName };
        const data = await s3Client.send(new DeleteBucketCommand(bucketParams));
        console.log(`Successfully deleted bucket ${bucketName}.`);
        return data;
    } catch (err) {
        console.log(`Error deleting bucket ${bucketName}.`, err);
    }
}

const uploadObject = async (bucketName, filePath) => {
    const objectName = path.basename(filePath);
    try {
        filePath = path.resolve(filePath);
        const fileStream = fs.createReadStream(filePath);
        const bucketParams = {
            Bucket: bucketName,
            Key: objectName,
            Body: fileStream,
        };
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        console.log(`Successfully uploaded object ${objectName}.`);
        return data;
    } catch (err) {
        console.log(`Error uploading object ${objectName}.`, err);
    }
}

const downloadObject = async (bucketName, objectName, filePath) => {
    try {
        filePath = path.resolve(filePath);
        const bucketParams = {
            Bucket: bucketName,
            Key: objectName,
        };
        const data = await s3Client.send(new GetObjectCommand(bucketParams));
        const writeStream = fs.createWriteStream(filePath);
        data.Body.pipe(writeStream);
        console.log(`Successfully downloaded object ${objectName}.`);
    } catch (err) {
        console.log(`Error downloading object ${objectName}.`, err);
    }
}

const listObjects = async (bucketName) => {
    try {
        const bucketParams = { Bucket: bucketName };
        const data = await s3Client.send(new ListObjectsCommand(bucketParams));
        return data.Contents;
    } catch (err) {
        console.log("Error listing objects.", err);
    }
}

const deleteObject = async (bucketName, objectName) => {
    try {
        const bucketParams = {
            Bucket: bucketName,
            Key: objectName,
        };
        const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
        console.log(`Successfully deleted object ${objectName}.`);
        return data;
    } catch (err) {
        console.log(`Error deleting object ${objectName}.`, err);
    }
}

const sampleAwsS3Executor = async () => {
    const bucketName = "innostax";
    const objectName = "index.js";
    const uploadFilePath = "./index.js";
    const downloadFilePath = "./copyOfIndex.js";

    await createBucket(bucketName);

    const buckets = await listBuckets();
    console.log("Bucket List", buckets.map((bucket) => bucket.Name));

    await uploadObject(bucketName, uploadFilePath);

    const objects = await listObjects(bucketName);
    console.log("Objects List", objects.map((object) => object.Key));

    await downloadObject(bucketName, objectName, downloadFilePath);
    await deleteObject(bucketName, objectName);
    await deleteBucket(bucketName);
}

module.exports = {
    createBucket,
    listBuckets,
    deleteBucket,
    uploadObject,
    downloadObject,
    listObjects,
    deleteObject,
    sampleAwsS3Executor,
};
