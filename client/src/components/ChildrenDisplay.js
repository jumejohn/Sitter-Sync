import React from "react";
import ChildInfo from "./ChildInfo";

const ChildrenDisplay = (props) => {
  const children = props.user.children;
  console.log(children, "children");

  return (
    <div>
      {children.map((child) => {
        return (
          <div className="card mb-3 content-box" key={child._id}>
            <div className="card-container">
              <img src="https://source.unsplash.com/random" alt={child.name} />
              <div className="card-img-overlay ">
                <ChildInfo child={child} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChildrenDisplay;
