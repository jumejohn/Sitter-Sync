import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ConfirmedEvents from "./ConfirmedEvents";
import PendingEvents from "./PendingEvents";
import { addEvent } from "../actions/AddEvent";

const EventsDisplay = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [createEvent, setCreateEvent] = useState(false);
  //   const family = useSelector((state) => state.rootReducer.family);
  const handleCreateToggle = () => setCreateEvent(!createEvent);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(addEvent(data, selectedList));

    reset();
    setCreateEvent(!createEvent);
    setSelectedList("");
  };

  const [selectedList, setSelectedList] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedList([...selectedList, e.target.value]);
    }
    if (!e.target.checked) {
      setSelectedList(selectedList.filter((x) => x !== e.target.value));
    }
  };

  return (
    <div>
      <div>
        {!createEvent ? (
          <button onClick={handleCreateToggle}>Add New Event</button>
        ) : (
          <div>
            <form>
              <div>
                {/* description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }, */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder=" Event Title"
                    {...register("Title")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text area"
                    className="form-control"
                    id="description"
                    placeholder=" Event Description"
                    {...register("description")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id=""
                    {...register("startDate")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id=""
                    {...register("endDate")}
                  />
                </div>
                <div>
                  {props.user.children.map((child) => {
                    return (
                      <div className="form-check" key={child._id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={child._id}
                          id="flexCheckDefault"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {child.name}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-3">
                  <label htmlFor="invitedUsers" className="form-label">
                    Invite Sitter Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="invitedUsers"
                    placeholder="Invite Sitter Email Address"
                    {...register("invitedUsers")}
                  />
                </div>
                <div>
                  <button onClick={handleSubmit(onSubmit)}>Submit</button>
                </div>
              </div>
            </form>
            <button onClick={handleCreateToggle}>Cancel</button>
          </div>
        )}
      </div>
      <>
        {props.user.events ? (
          <>
            {/* <ConfirmedEvents events={props.user} /> */}
            <PendingEvents user={props.user} />
          </>
        ) : (
          <h4>No Events Scheduled Yet</h4>
        )}
      </>
    </div>
  );
};
export default EventsDisplay;
