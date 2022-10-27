import React, { useState } from "react";

const ChildInfo = (props) => {
  const [open, setOpen] = useState("false");
  const child = props.child;
  const toggleInfo = () => {
    setOpen(!open);
  };

  return (
    <>
      {open ? (
        <button onClick={toggleInfo}>
          {child.name}, {child.age}
        </button>
      ) : (
        <div>
          <div>
            <h2>{child.name}</h2>
            <p>{child.age}</p>
            <p>{child.childFacts}</p>
            <button onClick={toggleInfo}>CLOSE</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildInfo;
