import { useState, useEffect } from "react";

export default function ToBuy({ item }) {
  const [displayArray, setDisplayArray] = useState([]);

  useEffect(() => {
    function displayItems() {
      const newDisplayArray = item.flatMap((msgPair) => [
        msgPair[0].message,
        msgPair[1].message,
      ]);
      setDisplayArray(newDisplayArray);
    }
    console.log(displayArray);
    displayItems();
  }, [item]);

  return (
    <>
      {displayArray.map((disp, i) => (
        <div className="toBuyItem"  key={i} dangerouslySetInnerHTML={{ __html: disp }}></div>
      ))}

    </>
  );
}
