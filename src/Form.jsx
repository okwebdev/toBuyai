import { useState } from "react";

export default function Form(props) {
  const [text, setText] = useState("");
  const { onSubmit } = props;

  function handleSubmit(e) {
    e.preventDefault();
    const newMessage = {
      message: text,
      sender: "user",
      direction: "outgoing",
    };
    onSubmit(newMessage);
    setText("");
  }
  return (
    <>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="textinput"></label>
          <input
            type="text"
            name="textinput"
            id=""
            placeholder="enter a product"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <br />
          <br />
          <button type="submit"> Enter</button>
        </form>
      </div>
      <br />
    </>
  );
}
