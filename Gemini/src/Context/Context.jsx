// src/Context/Context.jsx
import { Context }from "../Context/ContextFile";
import  {  useState } from "react";

// Create the Context object (named export)

// ContextProvider component that wraps your app and provides state and functions
export const ContextProvider = ({ children }) => {
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [ setRecentPrompt] = useState("");

  const onSent = async (prompt) => {
    // Example logic: Add prompt to previous prompts list
    setPrevPrompts((prev) => [prompt, ...prev]);
    setRecentPrompt(prompt);

    // Add your actual sending logic here
    console.log("Prompt sent:", prompt);
  };

  const newChat = () => {
    setRecentPrompt("");
    // Add any additional logic for starting a new chat
  };

  return (
    <Context.Provider value={{ onSent, prevPrompts, setRecentPrompt, newChat }}>
      {children}
    </Context.Provider>
  );
};
