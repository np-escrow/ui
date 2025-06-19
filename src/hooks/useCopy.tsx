import { useState } from "react";

export const useCopy = () => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);

      setIsCopy(true);

      setTimeout(() => {
        setIsCopy(false);
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setIsCopy(true);

      setTimeout(() => {
        setIsCopy(false);
      }, 2000);
    }
  };

  return { isCopy, handleCopy };
};
