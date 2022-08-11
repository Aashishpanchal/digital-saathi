import React from "react";
import { v4 as uuid } from "uuid";
import { Progress, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  accessKeyId,
  secretAccessKey,
  region,
  bucketName,
} from "../http/config";

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function useBucket(subDirName?: string) {
  const [progress, setProgress] = React.useState<Progress>();

  const S3ImageUploader = async (files: FileList) => {
    const file = files[0];
    const uploadS3 = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: `${subDirName}/${uuid().concat(`-${file.name}`)}`,
        Body: file,
      },
    });

    try {
      uploadS3.on("httpUploadProgress", (progress) => {
        setProgress(progress as any);
      });
      return uploadS3.done();
    } catch (error) {
      console.log(error);
    }
  };

  const getKey = (fileUrl: string) => {
    const url = new URL(fileUrl);
    return decodeURI(url.pathname.slice(1));
  };

  const S3DeleteImage = async (imageUrl: string) => {
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: getKey(imageUrl),
        })
      );
      return { success: true, data: "File deleted Successfully" };
    } catch (error) {
      console.log(error);
      return { success: false, data: "cannot deleted image in s3 bucket" };
    }
  };

  return { S3ImageUploader, progress, S3DeleteImage };
}

export default useBucket;
