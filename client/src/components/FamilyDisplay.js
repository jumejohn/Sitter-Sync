import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const FamilyDisplay = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createFam, setCreateFam] = useState(false);
  //   const family = useSelector((state) => state.rootReducer.family);
  const handleCreateFamily = () => setCreateFam(!createFam);
  return (
    <>
      <h3 className="family-display">Current Family</h3>
      <button onClick={handleCreateFamily}>add New Family</button>
      {!createFam ? (
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Family Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            placeholder="Family Name"
            {...register("name")}
          />
        </div>
      ) : (
        <div className="mb-3">Current Family</div>
      )}
    </>
  );
};

export default FamilyDisplay;
