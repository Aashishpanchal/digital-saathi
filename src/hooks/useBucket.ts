import React from "react";
import { v4 as uuid } from "uuid";
import { Progress, S3Client } from "@aws-sdk/client-s3";
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

function useBucket(subDirName: string) {
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

  return { S3ImageUploader, progress };
}

export default useBucket;
