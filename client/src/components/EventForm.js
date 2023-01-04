import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputLabel,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { addEvent } from "../actions/AddEvent";
import { editEvent } from "../actions/editEvent";

const EventForm = (props) => {
  // Load necessary functions for actions and form to work
  const { register, handleSubmit, reset, control } = useForm();
  const dispatch = useDispatch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });

  // Set up this form to receive correct data via state and props
  const setCreateEvent = props.setCreateEvent;
  const createEvent = props.createEvent;

  const user = props.user;
  const edit = props.edit;
  const setEdit = props.setEdit;
  const event = props.event;

  // set up which children array shows up in the form
  const children = user ? user.children : event.children;

  //handle form submit using React-Hook-Forms
  const onSubmit = (data) => {
    if (createEvent) {
      setCreateEvent(!createEvent);
      dispatch(addEvent(data, selectedList));
      reset();
    }
    if (edit) {
      setEdit(!edit);
      dispatch(editEvent(data, event._id));
      reset();
    }
    setSelectedList("");
    window.location.reload();
  };

  // create list of children to add to event children array
  const [selectedList, setSelectedList] = useState([]);
  const handleChange = (e) => {
    e.target.checked
      ? setSelectedList([...selectedList, e.target.value])
      : setSelectedList(selectedList.filter((x) => x !== e.target.value));
  };

  const handleCancel = () => {
    createEvent ? setCreateEvent(!createEvent) : setEdit(!edit);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", m: 2, mb: 7 }}>
          <Card sx={{ p: 1, m: 1 }}>
            <TextField
              variant="standard"
              fullWidth
              type="text"
              margin="normal"
              id="title"
              placeholder=" Event Title"
              {...register("title")}
            />
          </Card>

          <Card sx={{ p: 1, m: 1, display: "flex", flexDirection: "column" }}>
            {fields.map((field, index) => {
              return (
                <>
                  <TextField
                    variant="standard"
                    fullWidth="true"
                    multiline="true"
                    minRows="3"
                    type="text area"
                    margin="normal"
                    id="description"
                    placeholder="Bed at 8, feed dog at 6..."
                    {...register(`description.${index}.value`)}
                  />

                  <Button
                    sx={{
                      mb: 2,
                      width: "25%",
                    }}
                    size="small"
                    variant="contained"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </>
              );
            })}

            <Button
              variant="contained"
              onClick={() => append()}
              sx={{ maxWidth: "50%", alignSelf: "center" }}
            >
              Add Details or Tasks
            </Button>
          </Card>

          <Card sx={{ p: 1, m: 1 }}>
            <TextField
              type="dateTime-local"
              variant="standard"
              fullWidth
              margin="normal"
              id="startDate"
              {...register("startDate")}
            />
          </Card>
          <Card sx={{ p: 1, m: 1 }}>
            <TextField
              type="dateTime-local"
              variant="standard"
              fullWidth
              margin="normal"
              id="endDate"
              {...register("endDate")}
            />
          </Card>

          <Card sx={{ p: 1, m: 1 }}>
            {children.map((child) => {
              return (
                <Box
                  key={child._id}
                  sx={{ display: "flex", flexDirection: "row", m: 2 }}
                >
                  <Checkbox
                    className="form-check-input form-input"
                    type="checkbox"
                    value={child._id}
                    margin="normal"
                    color="default"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <InputLabel htmlFor="flexCheckDefault" sx={{ ml: 1 }}>
                    {child.name}
                  </InputLabel>
                </Box>
              );
            })}
          </Card>
          <Card sx={{ p: 1, m: 1 }}>
            <TextField
              variant="standard"
              margin="normal"
              type="email"
              fullWidth
              id="invitedUsers"
              placeholder="Invite Sitter Email Address"
              {...register("invitedUsers")}
            />
          </Card>
          <Box>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ m: 1 }}
            >
              Submit
            </Button>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EventForm;
