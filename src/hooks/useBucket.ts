import { v4 as uuid } from "uuid";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function useBucket(subDirName: string) {
  const ImageUploader = async (files: FileList) => {
    const file = files[0];
    try {
      const imageRef = ref(
        storage,
        `${subDirName}/${uuid().concat(`-${file.name}`)}`
      );
      const res = await uploadBytes(imageRef, file);
      return getDownloadURL(res.ref);
    } catch (error) {
      console.log(error);
    }
  };

  return { ImageUploader };
}

export default useBucket;
