import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addChildren } from "../actions/AddChild";
import ChildrenDisplay from "./ChildrenDisplay";

const FamilyDisplay = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [createFam, setCreateFam] = useState(false);
  //   const family = useSelector((state) => state.rootReducer.family);
  const handleCreateToggle = () => setCreateFam(!createFam);
  const onSubmit = (data) => {
    dispatch(addChildren(data));
    reset();
    setCreateFam(!createFam);
  };

  return (
    <>
      <h3 className="h3">Current Family</h3>

      {createFam ? (
        <>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder=" Name"
              {...register("name")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="age"
              className="form-control"
              id="name"
              placeholder=" Age"
              {...register("age")}
            />
            <button onClick={handleSubmit(onSubmit)}>Submit</button>
          </div>
        </>
      ) : (
        <button onClick={handleCreateToggle}>Add New Child</button>
      )}
      <ChildrenDisplay user={props.user} />
    </>
  );
};

export default FamilyDisplay;
