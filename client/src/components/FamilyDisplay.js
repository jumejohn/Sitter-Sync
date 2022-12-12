import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { addChildren } from "../actions/AddChild";
import ChildrenDisplay from "./ChildrenDisplay";
import {
  Box,
  Card,
  Paper,
  TextField,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const FamilyDisplay = (props) => {
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "childFacts",
  });
  const dispatch = useDispatch();
  const [createFam, setCreateFam] = useState(false);
  //   const family = useSelector((state) => state.rootReducer.family);
  const handleCreateToggle = () => setCreateFam(!createFam);
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addChildren(data));
    reset();
    setCreateFam(!createFam);
    window.location.reload();
  };

  return (
    <Paper elevation={0} sx={{ m: 5, mb: 10 }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Current Family
      </Typography>
      <Box display="flex" flexDirection={"row"}>
        <Container sx={{ maxWidth: "50%" }}>
          <Card elevation={1}>
            <ChildrenDisplay user={props.user} className="card-container" />
          </Card>
        </Container>
        <Container sx={{ mb: 8, maxWidth: "50%" }}>
          {createFam ? (
            <Card elevation={1} sx={{ boxShadow: 1 }}>
              <Box sx={{ p: 10 }} display="flex" flexDirection={"column"}>
                <TextField
                  label="Name"
                  type="text"
                  margin="normal"
                  id="name"
                  placeholder="Name"
                  {...register("name")}
                />
                <TextField
                  label="Age"
                  type="number"
                  margin="normal"
                  id="name"
                  placeholder="Age"
                  {...register("age")}
                />
                {fields.map((field, index) => {
                  return (
                    <>
                      <TextField
                        label="Things You Should Know About Me:"
                        key={field.id}
                        margin="normal"
                        type="text"
                        multiline="true"
                        rows="2"
                        id="childFacts"
                        placeholder="Likes to smile, takes meds, etc..."
                        {...register(`childFacts.${index}.value`)}
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
                  Add Facts About Me
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  className="form-button"
                  sx={{ m: 1 }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreateToggle}
                  className="form-button"
                  sx={{ m: 1 }}
                >
                  Cancel
                </Button>
              </Box>
            </Card>
          ) : (
            <Card elevation={0}>
              <Box sx={{ p: 10 }}>
                <Button
                  variant="contained"
                  onClick={handleCreateToggle}
                  className="add-new-button"
                  sx={{
                    color: grey[700],
                    fontWeight: "800",
                    m: 1,
                    letterSpacing: 1,
                    fontSize: 18,
                  }}
                >
                  Add New Child
                </Button>
              </Box>
            </Card>
          )}
        </Container>
      </Box>
    </Paper>
  );
};

export default FamilyDisplay;
