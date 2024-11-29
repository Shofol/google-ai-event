import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Translator from "./translator";

const Summarizer = ({ input }: { input: string }) => {
  const [summarizedText, setSummarizedText] = useState("");

  const [summaryType, setSummaryType] = useState<string | undefined>(undefined);
  const [summaryLength, setSummaryLength] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (input && input.length > 0) {
      summarizeNews();
    }
  }, [input]);

  const summarizeNews = async () => {
    const canSummarize = await window.ai.summarizer.capabilities();
    let summarizer;
    if (canSummarize && canSummarize.available !== "no") {
      if (canSummarize.available === "readily") {
        // The summarizer can immediately be used.
        summarizer = await window.ai.summarizer.create();
        summarize(summarizer);
      } else {
        // The summarizer can be used after the model download.
        summarizer = await window.ai.summarizer.create();
        summarizer.addEventListener("downloadprogress", (e) => {
          console.log(e.loaded, e.total);
        });
        await summarizer.ready;
      }
    } else {
      alert("The summaraizer isn't supported on your browser");
      // The summarizer can't be used at all.
    }
  };

  const summarize = async (summarizer: any) => {
    const textToSummarize = `Summarize the news into some main points from this news - ${input}`;
    const result = await summarizer.summarize(textToSummarize);
    setSummarizedText(result);
    summarizer.destroy();
  };

  const createNewSummarizer = async (
    type = "key-points",
    length = "medium",
    format = "plain-text",
  ) => {
    let summarizer = await window.ai.summarizer.create({ type, length });
    await summarize(summarizer);
  };

  const handleSummaryLength = async (length: string) => {
    setSummaryLength(length);
    await createNewSummarizer(summaryType, length);
  };

  const handleSummaryType = async (type: string) => {
    setSummaryType(type);
    await createNewSummarizer(type, summaryLength);
  };

  return (
    <div className="mt-5 rounded-lg bg-gray-800 px-5 py-5 text-sm text-gray-200 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="font-bold">Summarized News</p>
        {summarizedText && (
          <div className="flex gap-2">
            <Translator
              input={summarizedText}
              output={(text) => {
                setSummarizedText(text);
              }}
            />
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Length
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-xs text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryLength("short");
                    }}
                  >
                    Short
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryLength("medium");
                    }}
                  >
                    Medium
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryLength("long");
                    }}
                  >
                    Long
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Summary Type
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-xs text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryType("key-points");
                    }}
                  >
                    Key Points
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryType("tl;dr");
                    }}
                  >
                    TL;DR
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryType("teaser");
                    }}
                  >
                    Teaser
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      handleSummaryType("headline");
                    }}
                  >
                    Headline
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        )}
      </div>
      <p className="mt-5 text-sm">{summarizedText}</p>
    </div>
  );
};

declare global {
  interface Window {
    ai: any;
    translation: any;
    rewriter: any;
  }
}

export default Summarizer;
