import { NextResponse } from "next/server";
import { uploadToGCP } from "./uploadToStorage";

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  const podcastName = formDataEntryValues[0]
  const instructions = formDataEntryValues[1]
  const files = formDataEntryValues.slice(2)
  const instructionBlob = new Blob([instructions], {type: 'text/plain'});
  const instructionsFile = Buffer.from(await instructionBlob.arrayBuffer());

  try {
    for (const formDataEntryValue of files) {
      if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        const blob = formDataEntryValue as unknown as Blob;
        const filename = blob.name
        const file = Buffer.from(await blob.arrayBuffer());
        await uploadToGCP(file, podcastName, filename, instructionsFile);
      }
    }
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      {
        status: error.statusCode,
      }
    );
  }
  return NextResponse.json([], {
    status: 200,
  });
}
