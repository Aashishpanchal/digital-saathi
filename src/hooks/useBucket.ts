import React from "react";
import { v4 as uuid } from "uuid";
import { Progress, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  accessKeyId,
  secretAccessKey,
  region,
  bucketName,
  baseUrl,
  imgJwt,
  baseUrlImg,
} from "../http/config";
import axios from "axios";

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function useBucket(subDirName?: string) {
  const [progress, setProgress] = React.useState<Progress>();

  const imgUploader = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post<{ status: string; image: string }>(
        `${baseUrl}shop_upload`,
        formData,
        {
          headers: {
            token: imgJwt,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        image: "",
      };
    }
  };

  const imgDownload = async (img: string) =>
    axios.get(`${baseUrlImg}${img}`, {
      responseType: "blob",
      headers: {
        Authorization: imgJwt,
      },
    });

  const imgUpdate = async (prevImageUrl: string, files: any) => {
    if (prevImageUrl === files) {
      return { status: "success", image: prevImageUrl };
    } else {
      return imgUploader(files);
    }
  };

  const S3ImageUploader = async (file: File) => {
    if (file instanceof File) {
      const uploadS3 = new Upload({
        client: s3,
        params: {
          Bucket: bucketName,
          Key: `${subDirName}/${uuid().concat(`-${file.name}`)}`,
          Body: file,
        },
      });
      uploadS3.on("httpUploadProgress", (progress) => {
        setProgress(progress as any);
      });
      return uploadS3.done();
    } else {
      return {
        Location: "",
        error: "file is not File instance!",
      };
    }
  };

  const getKey = (fileUrl: string) => {
    try {
      const url = new URL(fileUrl);
      return decodeURI(url.pathname.slice(1));
    } catch (error) {
      return "";
    }
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
      return { success: true, data: "cannot deleted image in s3 bucket" };
    }
  };

  const S3UpdateImage = async (prevImageUrl: string, files: any) => {
    if (prevImageUrl === files) {
      return { Location: prevImageUrl };
    } else {
      await S3DeleteImage(prevImageUrl);
      return S3ImageUploader(files);
    }
  };

  return {
    S3ImageUploader,
    progress,
    S3DeleteImage,
    S3UpdateImage,

    imgDownload,
    imgUploader,
    imgUpdate,
  };
}

export default useBucket;
