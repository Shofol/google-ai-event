import Markdown from "markdown-to-jsx";
import { useCallback, useEffect, useState } from "react";
import Clipboard from "./clipboard";
import Loader from "./loader";
import Translator from "./translator";

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
  const [translatedText, setTranslatedText] = useState<null | string>(null);

  const execute = useCallback(async () => {
    const { available } =
      // defaultTemperature, defaultTopK, maxTopK
      await window.ai.languageModel.capabilities();

    if (available !== "no") {
      const session = await window.ai.languageModel.create();

      // Prompt the model and stream the result:
      const stream = session.promptStreaming(`${prompt} ${input}`);
      for await (const chunk of stream) {
        setResultText(chunk);
      }
      session.destroy();
    }
  }, [input, prompt]);

  useEffect(() => {
    if (input && input.length > 0) {
      setResultText(null);
      setTranslatedText(null);
      execute();
    }
    return () => {};
  }, [input, execute]);

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
                    setTranslatedText(text);
                  }}
                />
                <Clipboard
                  input={translatedText ? translatedText : resultText}
                />
              </div>
            )}
          </div>
          <div className="my-5 h-px bg-gray-400" />
          <Markdown className="leading-loose">
            {translatedText ? translatedText : resultText ? resultText : ""}
          </Markdown>
        </>
      )}
    </>
  );
};

export default Prompt;
