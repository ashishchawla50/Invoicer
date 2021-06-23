import { Box, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";

export const TextBox = (props: any) => {
  const useStyles = makeStyles((theme) => ({
    texboxWrapper: {
      width: "100%",
      "&.textAreaComponent": {
        "& textarea": {
          height: "170px !important",
        },
      },
    },
  }));
  const classes = useStyles();
  const handleonChange = (e: any) => {
    e.target.value = e.target.value.trim();
    props.onChange(e);
  };
  props.value.trim();
  return (
    <Box p={1}>
      <TextField
        className={
          classes.texboxWrapper + (props.isTextArea ? " textAreaComponent" : "")
        }
        id="outlined-helperText"
        label={props.label}
        variant="outlined"
        value={props.value}
        type={props?.type || "text"}
        name={props.name}
        multiline={props.isTextArea}
        onChange={(e) => props.onChange(e)}
        onBlur={(e) => handleonChange(e)}
        disabled={props?.disabled}
      />
    </Box>
  );
};
