import matter from "gray-matter";

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export async function listS3Objects(bucketName: string, prefix?: string) {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  try {
    const response = await s3.listObjectsV2(params).promise();
    if (response.Contents) {
      const folders = response.Contents.map((content) => {
        return content.Key;
      });
      return folders;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

export async function getS3ObjectContent(bucketName: string, key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const response = await s3.getObject(params).promise();
    if (response.Body) {
      const data = matter(response.Body.toString("utf-8"));
      return response.Body.toString("utf-8");
    }
  } catch (error) {
    throw error;
  }
}
