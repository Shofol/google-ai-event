/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { languageList } from "../data/data";
import { Language } from "../types/types";

const Translator = ({
  input,
  output,
}: {
  input: string;
  output: (translatedText: string) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async (target: string) => {
    const languagePair = {
      sourceLanguage: "en",
      targetLanguage: target,
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
        const id = toast.loading("Downloading Model. Please wait...");
        translator = await window.translation.createTranslator(languagePair);
        toast.update(id, {
          render: "Model Downloaded Successfully",
          type: "success",
          isLoading: false,
        });
        toast.dismiss(id);
        await translator.ready;
        await translateText(target);
      }
    } else {
      alert("Your browser doesn't support translation api");
      // The translator can't be used at all.
    }
  };

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
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
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-xs text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {languageList.map((language: Language) => {
          return (
            <MenuItem key={language.code}>
              <button
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
                onClick={() => {
                  translateText(language.code);
                }}
              >
                {language.label}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default Translator;
