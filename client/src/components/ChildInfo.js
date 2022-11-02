import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { editChild } from "../actions/EditChild";

Modal.setAppElement("#root");

const ChildInfo = (props) => {
  const child = props.child;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onSubmit = (data) => {
    dispatch(editChild(data, child._id));
    reset();
    toggleEdit();
  };

  return (
    <>
      <h5 className="card-title family-button" onClick={toggleModal}>
        {child.name}, {child.age}
      </h5>
      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel={child.name}
        style={{
          content: { margin: "40px", display: "flex", height: "100%" },
        }}
      >
        <div className="">
          <div className="">
            {edit ? (
              <div className="content-box">
                <div className="mb-3 ">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control form-input"
                    id="name"
                    defaultValue={child.name}
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
                    defaultValue={child.age}
                    {...register("age")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="childFacts" className="form-label">
                    Special Notes
                  </label>
                  <textarea
                    type="text"
                    className="form-control form-input"
                    id="childFacts"
                    defaultValue={child.childFacts}
                    {...register("childFacts")}
                  />
                </div>
                <div className="whitespace-container-row">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="form-button"
                  >
                    Submit
                  </button>

                  <button onClick={toggleEdit} className="form-button">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="card " style={{ maxWidth: "100%" }}>
                  <div className="row">
                    <div className="col ">
                      <img
                        src="https://source.unsplash.com/random"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>

                    <div className="col card-container content-box">
                      <div className=" content-box">
                        <h2>{child.name}</h2>
                        <h4>Age: {child.age}</h4>
                        <div>
                          <hr />
                          <span>
                            <p>
                              <strong>Notes about me:</strong>
                            </p>
                          </span>
                          <br />
                          {child.childFacts}
                        </div>
                        <button onClick={toggleEdit} className="add-new-button">
                          Edit Details
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={toggleModal}
                          className="add-new-button"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChildInfo;
