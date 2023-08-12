"use client";

import { useState } from "react";
import { useAuthContext } from "./src/context/AuthContext";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import LoadingDots from "../components/LoadingDots";

export default function HomePage() {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  console.log("user: ", user);

  const handleGeneratePodcast = async () => {
    setLoading(true);
    if (user == null) {
      setLoading(false);
      return router.push("signin");
    }
    setLoading(false);
    router.push("/generate");
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header user={user} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Turn your documents into customizable podcasts{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Upload your documents and start listening to your content today.
        </h2>
        {loading ? (
          <button
            disabled
            className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
          >
            <span className="pt-4">
              <LoadingDots color="white" style="large" />
            </span>
          </button>
        ) : (
          <button
            className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
            onClick={handleGeneratePodcast}
          >
            Generate Podcast
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}
