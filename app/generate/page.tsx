"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAuthContext } from "../src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Upload from "../../components/Upload";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import { createSpodkast } from "../src/services/spodkast";

export default function GeneratePage() {
  const { user }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    //console.log("user: ", user)
    if (user == null) router.push("/");
  }, [user]);

  const [documents, setDocuments] = useState<any>(null);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [podcastLoaded, setPodcastLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //const [docName, setDocName] = useState<string | null>(null);
  const [podcastName, setPodcastName] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");

  function handleDownload() {
    console.log("download clicked");
    alert("download clicked");
  }

  async function generateAudio() {
    if (!podcastName) {
      setError("Please write a name for the podcast");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      setGeneratedAudio(null);
      setPodcastLoaded(false);
      setError(null);
      setLoading(true);

      const _files = Array.from(documents);
      const formData = new FormData();

      formData.append("podcastName", podcastName);
      formData.append("instructions", instructions);
      let pdfUrls = "";
      _files.forEach((file: any) => {
        pdfUrls =
          pdfUrls +
          "https://storage.googleapis.com/yggdrasil-ai-hermod-public/" +
          `spodkest/` +
          podcastName +
          `/` +
          file.name +
          ",";
        formData.append("files", file);
      });
      pdfUrls = pdfUrls.slice(0, -1)

      const res = await fetch("/generate-podcast", {
        method: "POST",
        body: formData,
      });

      //console.log("res: ", res);

      await createSpodkast({
        //author: user.uid,
        author: "pdftopodcastmanager",
        name: podcastName,
        inputFiles: pdfUrls,
        instructions: instructions,
      });

      let newPodcast = await res.json();
      if (res.status !== 200) {
        setError(res.statusText);
        setLoading(false);
      } else {
        //setGeneratedAudio(newPodcast[1]);
        setLoading(false);
        setDocuments(null);
        setPodcastLoaded(true);
        setPodcastName("")
        setInstructions("")
      }
    } catch (e: any) {
      //console.log(e);
      //setError(e);
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header user={user} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
          Generate your <span className="text-blue-600">Podcast</span>
        </h1>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {!generatedAudio && (
                <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                      <Image
                        src="/number-1-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Write a name for the podcast:
                      </p>
                    </div>
                    <div className="relative block text-left">
                      <input
                        type="text"
                        onChange={(e) => {
                          e.target.value.length > 0 && setError("");
                          setPodcastName(e.target.value);
                        }}
                        value={podcastName}
                        className="w-full text-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-10 items-center space-x-3">
                      <Image
                        src="/number-2-white.svg"
                        width={30}
                        height={30}
                        alt="2 icon"
                      />
                      <p className="text-left font-medium">
                        Specify instructions (optional):
                      </p>
                    </div>
                    <div className="relative block text-left">
                      <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full text-black"
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                      <Image
                        src="/number-3-white.svg"
                        width={30}
                        height={30}
                        alt="3 icon"
                      />
                      <p className="text-left font-medium">Upload your PDFs:</p>
                    </div>
                  </div>
                </>
              )}
              {generatedAudio && (
                <div>
                  Here's your <b>Podcast</b>
                </div>
              )}
              {<Upload fileList={documents} setFileList={setDocuments} />}
              {loading && (
                <button
                  disabled
                  className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {documents?.length > 0 && !loading && (
                  <button
                    onClick={() => {
                      generateAudio();
                    }}
                    className={`bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 ${
                      !podcastName
                        ? "opacity-50"
                        : "opacity-100 hover:bg-blue-500/80"
                    }  transition`}
                  >
                    Generate New Podcast
                  </button>
                )}
                {podcastLoaded && (
                  <div>
                    Files uploaded successfully! We'll send the results to your
                    email in just a few minutes.
                  </div>
                  /*}
                  <button
                    onClick={() => {
                      handleDownload();
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    Download Generated Podcast
                  </button>*/
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
