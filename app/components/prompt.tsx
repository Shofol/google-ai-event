import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import Loader from "./loader";
import Translator from "./translator";
import Clipboard from "./clipboard";

const Prompt = ({
  input,
  prompt,
  showMenu = true,
}: {
  input: string;
  prompt: string;
  showMenu?: boolean;
}) => {
  const [resultText, setResultText] = useState<null | string>(null);

  useEffect(() => {
    if (input && input.length > 0) {
      execute();
    }
  }, []);

  const execute = async () => {
    const { available, defaultTemperature, defaultTopK, maxTopK } =
      await window.ai.languageModel.capabilities();

    if (available !== "no") {
      const session = await window.ai.languageModel.create();

      // Prompt the model and stream the result:
      const stream = session.promptStreaming(`${prompt} ${input}`);
      for await (const chunk of stream) {
        setResultText(chunk);
      }
    }
  };
  return (
    <>
      {!resultText && <Loader />}
      {resultText && (
        <>
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">NewsBreak Answer</h2>
            {showMenu && (
              <div className="flex justify-end gap-2">
                <Translator
                  input={resultText}
                  output={(text) => {
                    setResultText(resultText);
                  }}
                />
                <Clipboard input={resultText} />
              </div>
            )}
          </div>
          <div className="my-5 h-px bg-gray-400" />
          <Markdown className="leading-loose">{resultText}</Markdown>
        </>
      )}
    </>
  );
};

export default Prompt;
