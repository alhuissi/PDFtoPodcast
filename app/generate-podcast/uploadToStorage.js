import { Storage } from "@google-cloud/storage";

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
);

const storage = new Storage({
  projectId: 'yggdrasil-ai-hermod',
  credentials: credential,
});

const bucketName = "yggdrasil-ai-hermod-public";
const bucket = storage.bucket(bucketName);

export async function uploadToGCP(file, podcastName, filename, instructionsFile) {
  await bucket.file(`spodkest/`+podcastName+`/`+filename).save(file)
  await bucket.file(`spodkest/`+podcastName+`/instructions.txt`).save(instructionsFile)
  /*
  bucket.upload(
    file,
    {
      destination: `spodkest/`+podcastName+`/`+filename,
    },
    function (err, file) {
      if (err) {
        console.error(`Error uploading file: ${err}`);
      } else {
        console.log(`File uploaded to ${bucketName}.`);
      }
    }
  );
  */
}
