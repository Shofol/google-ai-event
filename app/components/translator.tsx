/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Translator = ({
  input,
  output,
}: {
  input: string;
  output: (translatedText: string) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    const languagePair = {
      sourceLanguage: "en", // Or detect the source language with the Language Detection API
      targetLanguage: "bn",
    };

    const canTranslate = await window.translation.canTranslate(languagePair);

    let translator;
    if (canTranslate !== "no") {
      if (canTranslate === "readily") {
        // The translator can immediately be used.
        translator = await window.translation.createTranslator(languagePair);
        const translation = await translator.translate(input);
        output(translation);
        setTranslatedText(translation);
      } else {
        // The translator can be used after the model download.
        translator = await window.translation.createTranslator(languagePair);
        translator.addEventListener("downloadprogress", (e: any) => {
          console.log(e.loaded, e.total);
        });
        await translator.ready;
        await translateText();
      }
    } else {
      alert("Your browser doesn't support translation api");
      // The translator can't be used at all.
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        translateText();
      }}
      className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
    >
      Translate
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
          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
        />
      </svg>
    </button>
  );
};

export default Translator;
