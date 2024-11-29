import React, { useEffect, useState } from "react";

const Article = ({ input }: { input: string }) => {
  const [newText, setNewText] = useState("");

  useEffect(() => {
    if (input && input.length > 0) {
      write();
    }
  }, [input]);

  const write = async () => {
    const writer = await window.ai.writer.create();

    const stream = await writer.writeStreaming(
      `Write a blog post on this text - ${input}`,
    );
    let fullResponse = "";
    for await (const chunk of stream) {
      fullResponse = chunk.trim();
      setNewText(fullResponse);
    }
  };

  return (
    <div className="mt-5 rounded-lg bg-gray-800 px-5 py-5 text-sm text-gray-200 shadow-lg">
      {newText}
    </div>
  );
};

export default Article;
