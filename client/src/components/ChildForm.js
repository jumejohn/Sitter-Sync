import React from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { editChild } from "../actions/EditChild";
import { addChildren } from "../actions/AddChild";
const ChildForm = (props) => {
  const child = props.child || null;
  const createFam = props.createFam;
  const handleCreateToggle = props.handleCreateToggle;
  const toggleEdit = props.toggleEdit;
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "childFacts",
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (createFam) {
      console.log(data);
      dispatch(addChildren(data));
      reset();
      handleCreateToggle();
      window.location.reload();
    }
    dispatch(editChild(data, child._id));
    reset();
    toggleEdit();
  };
  return (
    <Box sx={{ p: 10, m: 5, border: "none" }}>
      <Paper sx={{ position: "relative", p: 10, width: "100%" }}>
        <TextField
          variant="standard"
          fullWidth
          margin="normal"
          type="name"
          id="name"
          label="Name"
          defaultValue={child ? child.name : "Child name"}
          {...register("name")}
        />

        <TextField
          variant="standard"
          fullWidth
          margin="normal"
          type="age"
          id="name"
          label="Age:"
          defaultValue={child ? child.age : "Child Age"}
          {...register("age")}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {fields.map((field, index) => {
            return (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Things You Should Know About Me:"
                  key={field.id}
                  margin="none"
                  type="text"
                  id="childFacts"
                  placeholder="Likes to smile, takes meds, etc..."
                  {...register(`childFacts.${index}.value`)}
                />
                <Button
                  sx={{
                    ml: 1,
                    p: 1,
                    width: "25%",
                    fontSize: "larger",
                  }}
                  size="small"
                  variant="normal"
                  onClick={() => remove(index)}
                >
                  X
                </Button>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => append()}
            sx={{ maxWidth: "50%", alignSelf: "center" }}
          >
            Add Facts About Me
          </Button>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              sx={{ m: 1 }}
            >
              Submit
            </Button>

            <Button
              onClick={createFam ? handleCreateToggle : toggleEdit}
              variant="contained"
              sx={{ m: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChildForm;
