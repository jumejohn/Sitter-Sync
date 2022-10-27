import React from "react";
import ChildInfo from "./ChildInfo";

const ChildrenDisplay = (props) => {
  const children = props.user.children;
  console.log(children, "children");

  return (
    <div>
      {children.map((child) => {
        return (
          <div key={child._id}>
            <ChildInfo child={child} />
          </div>
        );
      })}
    </div>
  );
};

export default ChildrenDisplay;
