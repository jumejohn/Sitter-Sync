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
    window.location.reload();
  };

  return (
    <div className="row whitespace-container-row">
      <h3 className="h3">Current Family</h3>
      <div className="row whitespace-container-row">
        <div className="container col">
          <div className=" content-box ">
            <div className="whitespace-container">
              <div className="content-box">
                <ChildrenDisplay user={props.user} className="card-container" />
              </div>
            </div>
          </div>
        </div>
        <div className="container col">
          <div className="content-box">
            {createFam ? (
              <>
                <div className="whitespace-container">
                  <div className="content-box">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="name"
                        className="form-control form-input"
                        id="name"
                        placeholder="Name"
                        {...register("name")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Age
                      </label>
                      <input
                        type="age"
                        className="form-control form-input"
                        id="name"
                        placeholder="Age"
                        {...register("age")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="childFacts" className="form-label">
                        Things you should know about me:
                      </label>
                      <textarea
                        type="text"
                        rows="6"
                        className="form-control form-input"
                        id="childFacts"
                        placeholder="Likes to smile, takes meds, etc..."
                        {...register("childFacts")}
                      />
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="form-button"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleCreateToggle}
                        className="form-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="whitespace-container">
                <div className="content-box">
                  <button
                    onClick={handleCreateToggle}
                    className="add-new-button"
                  >
                    Add New Child
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDisplay;
