import React from "react";

const ChildrenDisplay = (props) => {
  const children = props.user.children;

  return (
    <div>
      {children.map((child) => {
        return (
          <div key={child._id}>
            {child.name}, {child.age}
          </div>
        );
      })}
    </div>
  );
};

export default ChildrenDisplay;
