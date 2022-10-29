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
  function toggleModal() {
    setOpen(!open);
  }
  function toggleEdit() {
    setEdit(!edit);
  }

  const onSubmit = (data) => {
    dispatch(editChild(data, child._id));
    reset();
    toggleEdit();
  };

  return (
    <>
      <button onClick={toggleModal}>
        {child.name}, {child.age}
      </button>
      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel={child.name}
      >
        <div>
          {edit ? (
            <>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  id="childFacts"
                  defaultValue={child.childFacts}
                  {...register("childFacts")}
                />
              </div>
              <button onClick={handleSubmit(onSubmit)}>Submit</button>
              <button onClick={toggleEdit}>Cancel</button>
            </>
          ) : (
            <div>
              <h2>{child.name}</h2>
              <p>{child.age}</p>
              <p>{child.childFacts}</p>
              <div>
                <button onClick={toggleEdit}>Edit Details</button>
                <button onClick={toggleModal}>CLOSE</button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ChildInfo;
