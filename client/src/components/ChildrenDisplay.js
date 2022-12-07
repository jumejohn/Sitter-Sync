import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
import React from "react";
import ChildInfo from "./ChildInfo";

const ChildrenDisplay = (props) => {
  const children = props.user.children;
  console.log(children, "children");

  return (
    <Paper elevation={0} sx={{ m: 4 }}>
      {children.map((child) => {
        return (
          <Card
            key={child._id}
            elevation={0}
            sx={{ boxShadow: 1, maxWidth: 1, p: 4 }}
          >
            <CardMedia
              component="img"
              src="https://source.unsplash.com/random"
              alt={child.name}
              height="190px"
            />
            <CardActionArea>
              <CardContent>
                <ChildInfo child={child} />
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Paper>
  );
};

export default ChildrenDisplay;
