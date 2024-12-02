"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import Article from "./components/article";
import Prompt from "./components/prompt";
import Summarizer from "./components/summarizer";
import Navbar from "./components/navbar";
import { options } from "./data/data";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeView, setActiveView] = useState<string | null>(null);
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-purple-200 to-gray-200">
      <Navbar />

      <div
        className={`mt-32 flex flex-col items-center justify-center ${inter.className}`}
      >
        <div className="text-center">
          <h1 className={`font-poppins text-8xl font-bold`}>
            News<span className="-ml-6 text-white">Break</span>
          </h1>
          <p className="mt-3 text-2xl">Smarter news, your way.</p>
        </div>
        <main className="my-10 flex max-w-[80vw] flex-col items-center gap-5">
          <div>
            <div className="flex items-center justify-end gap-2 rounded-tl-lg rounded-tr-lg bg-purple-500 px-5 py-4 shadow-lg">
              {options.map((item) => {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveView(item.name);
                    }}
                    type="button"
                    className="flex items-center rounded-md bg-white px-4 py-1 text-sm text-purple-700 transition-transform duration-300 hover:-translate-y-1 hover:text-purple-800 hover:shadow-sm"
                  >
                    <Image
                      src={`/icons/${item.icon}`}
                      width={18}
                      height={18}
                      alt="icon"
                      className="mr-1"
                    />

                    {item.name.charAt(0).toUpperCase() +
                      item.name.substring(1, item.name.length)}
                  </button>
                );
              })}
            </div>
            <form className="mx-auto min-w-[80vw] max-w-sm">
              <div className="mb-5">
                <textarea
                  rows={10}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value as string);
                  }}
                  id="url"
                  className="block w-full rounded-bl-lg rounded-br-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Put Your News Here"
                  required
                />
              </div>
            </form>
          </div>

          {activeView && (
            <div className="min-w-[80vw] rounded-lg bg-gray-800 p-10 text-sm text-gray-200 shadow-lg">
              {activeView === "summarize" && <Summarizer input={input} />}
              {activeView === "explain" && (
                <Prompt
                  input={input}
                  prompt={
                    "Give me easy explanation and history of this topic -"
                  }
                />
              )}
              {activeView === "write" && <Article input={input} />}
              {activeView === "social" && (
                <Prompt
                  input={input}
                  prompt={
                    "Write social media post on this topic with hashtags -"
                  }
                />
              )}
              {activeView === "editorial" && (
                <Prompt
                  input={input}
                  prompt={"Write a editorial on this topic"}
                />
              )}
              {activeView === "feedback" && (
                <Prompt
                  input={input}
                  prompt={"Give me feedback on this topic"}
                />
              )}
              {activeView === "campaign" && (
                <Prompt
                  input={input}
                  prompt={
                    "Give a outline for running a campaign on this topic -"
                  }
                />
              )}
              {activeView === "poll" && (
                <Prompt
                  input={input}
                  prompt={
                    "Create a poll based on this topic with three options"
                  }
                />
              )}
            </div>
          )}
        </main>
        <footer className="mt-20 flex min-w-[80vw] items-center justify-between">
          <div>
            Built by{" "}
            <Link
              href="https://anower-jahan-shofol.netlify.app/"
              target="_blank"
              rel="noopener norefferer"
              className="ml-1 font-bold hover:text-purple-700"
            >
              Anower Jahan Shofol
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={"https://x.com/jahananower"}
              target="_blank"
              rel="noopener norefferer"
            >
              <Image src="/social/x.svg" width={16} height={16} alt="x logo" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/anower-jahan/"}
              target="_blank"
              rel="noopener norefferer"
            >
              <Image
                src="/social/linkedin.svg"
                width={22}
                height={22}
                alt="linkedin logo"
              />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
