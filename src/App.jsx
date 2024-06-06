import { useState } from "react";
import "./App.css";
import Form from "./Form";
// @ts-ignore
import ToBuy from "./ToBuy";

function App() {
  const [messages, setMessages] = useState([]);
  const [toBuys, setToBuys] = useState([]);
  const [typing, setTyping] = useState(false)

  const API_KEY = "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";

  const handleSend = async (newMessage) => {
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    setTyping(true)
    let apiMessages = chatMessages.map((messageObj) => {
      let role = "";
      if (messageObj.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObj.message };
    });
    const systemMessage = {
      role: "system",
      content: "please provide the top 3 products on amazon for the input with line breaks  in html",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        const chatGPTMessage = {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, chatGPTMessage];
          handleToBuys(updatedMessages); // Pass the updated messages to handleToBuys
          return updatedMessages;
        });
        setTyping(false)
      });

    function handleToBuys(updatedMessages) {
      const newToBuys = [];
      const chunkSize = 2;
      for (let i = 0; i < updatedMessages.length; i += chunkSize) {
        const chunk = updatedMessages.slice(i, i + chunkSize);
        newToBuys.push(chunk);
      }
      setToBuys([newToBuys]);
    }
    handleToBuys();
  }

  return (
    <>
      <h1>tobuy.ai</h1>
      <p>enter a product and description to recieve smart suggestions </p>

      <Form onSubmit={handleSend} />
      {typing ? <p>typing...</p> : null}

      {toBuys.map((toBuy, i) => (
        <ToBuy key={i} item={toBuy} />
      ))}
      <br />
    </>
  );
}

export default App;
