// src/Context/Context.jsx
import  {  useState } from "react";
import { Context } from "./ContextFile";
import run from "../Config/gemini" // make sure this path is correct

// Create context


export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextText) => {
    // multiply to stagger display, not bitwise AND
    setTimeout(() => {
      setResultData((prev) => (prev || "") + nextText);
    }, 75 * index);
  };

  const onSent = async (promptArgument) => {
    // Use promptArgument if given else fallback to input
    const promptToSend = typeof promptArgument === "string" && promptArgument.length > 0 ? promptArgument : input;
    if (!promptToSend) return;

    try {
      setLoading(true);
      setShowResult(false);
      setResultData(""); // reset before streaming

      const response = await run(promptToSend); // ensure run returns a string
      if (typeof response !== "string") {
        // if run returns object, convert appropriately
        // adjust this depending on your gemini wrapper
        console.warn("run() did not return a string; converting to string.");
      }
      // Basic safe HTML conversions:
      let responseText = String(response);

      // Replace bold markers if that's your intended markup (example)
      // change this logic to match how your model returns markup
      // Replace occurrences of "**...**" -> keep them or render later
      // Here we convert single * or double ** to breaks for now:
      responseText = responseText.split("**").join(""); // if you want to remove markers
      // Convert single '*' markers to <br/>
      responseText = responseText.split("* *").join("\n\n");
      responseText = responseText.split("*").join("\n");

      // Split into chunks for typed effect
      const chunks = responseText.split("\n").filter(Boolean);
      chunks.forEach((chunk, i) => delayPara(i, chunk + " "));

      // after streaming, set the metadata
      setPrevPrompts((prev) => [promptToSend, ...prev]);
      setRecentPrompt(promptToSend);
      setInput("");
      setShowResult(true);
    } catch (err) {
      console.error("Error sending prompt:", err);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setRecentPrompt("");
    setResultData("");
    setShowResult(false);
  };

  return (
    <Context.Provider value={{
      input,
      setInput,
      onSent,
      prevPrompts,
      recentPrompt,
      setRecentPrompt,
      newChat,
      showResult,
      loading,
      resultData
    }}>
      {children}
    </Context.Provider>
  );
};
