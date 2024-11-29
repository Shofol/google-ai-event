"use client";
import { Inter } from "next/font/google";
import { useState } from "react";
import Summarizer from "./components/summarizer";
import Article from "./components/article";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showSummarizer, setShowSummarizer] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div
      className={`min-w-screen flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#cfcaff] to-[#918beb] ${inter.className}`}
    >
      <div className="text-center">
        <h1 className="text-8xl font-bold">
          Insight<span className="text-white">AI</span>
        </h1>
        <p className="mt-3 text-2xl">Smarter news, your way.</p>
      </div>
      <main className="row-start-2 my-10 flex flex-col items-center gap-8 sm:items-start">
        <form className="mx-auto min-w-[80vw] max-w-sm">
          <div className="mb-5">
            {/* <label
              htmlFor="url"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Put Your News Here
            </label> */}
            <textarea
              rows={10}
              value={input}
              onChange={(e) => {
                setInput(e.target.value as string);
              }}
              id="url"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Put Your News Here"
              required
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setShowArticle(false);
                setShowSummarizer(true);
              }}
              type="button"
              className="rounded-full bg-white px-4 py-1 text-xs text-purple-700 shadow-lg hover:text-purple-800 hover:shadow-sm"
            >
              Summarize
            </button>

            <button
              onClick={() => {
                setShowSummarizer(false);
                setShowArticle(true);
              }}
              type="button"
              className="rounded-full bg-white px-4 py-1 text-xs text-purple-700 shadow-lg hover:text-purple-800 hover:shadow-sm"
            >
              Write a article
            </button>
          </div>

          {showSummarizer && <Summarizer input={input} />}
          {showArticle && <Article input={input} />}
        </form>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
    </div>
  );
}
