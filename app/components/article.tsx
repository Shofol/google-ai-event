import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Markdown from "markdown-to-jsx";
import { useCallback, useEffect, useState } from "react";
import Clipboard from "./clipboard";
import Loader from "./loader";
import Prompt from "./prompt";
import Translator from "./translator";

const Article = ({ input }: { input: string }) => {
  const [newText, setNewText] = useState<null | string>(null);
  const [translatedText, setTranslatedText] = useState<null | string>(null);

  const write = useCallback(async () => {
    const writer = await window.ai.writer.create({
      tone: "casual",
      sharedContext:
        "This article is for publishing on a news media website. This must have a heading, subheading, image link and word count will be minimum of 200 words.",
    });

    const stream = writer.writeStreaming(input, {
      context: "the article is for general people for reading about this topic",
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      fullResponse = chunk.trim();
      setNewText(fullResponse);
    }
    writer.destroy();
  }, [input]);

  useEffect(() => {
    if (input && input.length > 0) {
      setNewText(null);
      setTranslatedText(null);
      void write();
    }
  }, [input, write]);

  const reWrite = async (tone: string) => {
    setNewText(null);
    setTranslatedText(null);
    const rewriter = await window.ai.rewriter.create({
      tone: tone,
      sharedContext:
        "This article is for publishing on a news media website. This must have a heading, subheading, image link and word cound will be minimum of 200 words.",
    });

    const stream = rewriter.rewriteStreaming(input, {
      context: "the article is for general people for reading about this topic",
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      fullResponse = chunk.trim();
      setNewText(fullResponse);
    }
    rewriter.destroy();
  };

  return (
    <>
      {!newText && <Loader />}
      {newText && (
        <>
          <div className="flex justify-end">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Rewrite
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
                      reWrite("as-is");
                    }}
                  >
                    As is
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      reWrite("more-casual");
                    }}
                  >
                    Casual
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                    onClick={() => {
                      reWrite("more-formal");
                    }}
                  >
                    Formal
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <h2 className="fotn-bold my-5 bg-purple-500 px-4 py-1 text-xl font-bold">
            Blog Article
          </h2>

          <div className="mb-5 flex justify-end gap-2">
            <Translator
              input={newText}
              output={(text) => {
                setTranslatedText(text);
              }}
            />
            <Clipboard input={translatedText ? translatedText : newText} />
          </div>

          <Markdown>
            {translatedText ? translatedText : newText ? newText : ""}
          </Markdown>

          <h2 className="fotn-bold my-5 bg-purple-500 px-4 py-1 text-xl font-bold">
            SEO Information
          </h2>

          <Prompt
            input={input}
            prompt={
              "Give me a headline, sub headline, tags, keywords list, excerpt, description for best SEO for blog article on this topic -"
            }
          />
        </>
      )}
    </>
  );
};

export default Article;
