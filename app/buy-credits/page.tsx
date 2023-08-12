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
      pdfUrls = pdfUrls.slice(0, -1);

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
        setPodcastName("");
        setInstructions("");
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
          Buy Credits
        </h1>
        <p>1 credit = 1 podcast</p>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4"></motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
