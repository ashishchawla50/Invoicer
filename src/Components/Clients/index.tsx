import {
  makeStyles,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import DataTable from "../DataTable";
import { TextBox } from "../TextBox";
import { IClientModal } from "./type";

export const Clients = () => {
  React.useEffect(() => {
    console.log("Clients Called");
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  const clientColumns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "clientName", headerName: "Client Name", width: 150 },
    { field: "clientAddress", headerName: "Client Address", width: 150 },
    { field: "GSTNumber", headerName: "GST Number", width: 150 },
  ];

  const [isGSTApplicable, setIsGSTApplicable] = React.useState(false);
  const initClientInfo = {
    id: -1,
    clientName: "",
    clientAddress: "",
    GSTNumber: "",
  };
  const oldEntry = localStorage.getItem("client");
  const [clientInfo, setClientInfo] = useState(initClientInfo);

  const [rows, setRows] = React.useState<any>(
    oldEntry ? JSON.parse(oldEntry) : initClientInfo
  );

  const handleChange = (event: any) => {
    const { name, checked } = event.target;
    setClientInfo((prevState: any) => {
      const newState = { ...prevState };
      newState[name] = checked;
      return newState;
    });

    setIsGSTApplicable(event.target.checked);
  };

  const pushData = () => {
    const row: any = rows?.length ? [...rows] : [];
    row.push({
      id: row?.length + 1 || 1,
      clientName: clientInfo.clientName,
      clientAddress: clientInfo.clientAddress,
      GSTNumber: clientInfo.GSTNumber,
    });
    setRows(row);
    localStorage.setItem("client", JSON.stringify(row));
    console.log(sessionStorage);
    setIsGSTApplicable(false);
    setClientInfo(initClientInfo);
  };

  const handleTextBoxChange = (e: any) => {
    const { name, value } = e.target;
    setClientInfo((prevState: any) => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box p={1}>Manage Clients</Box>
            <TextBox
              label="Client Name"
              value={clientInfo.clientName}
              onChange={handleTextBoxChange}
              name="clientName"
            />
            <TextBox
              label="Client Address"
              value={clientInfo.clientAddress}
              name="clientAddress"
              onChange={handleTextBoxChange}
              isTextArea={true}
            />
            <FormControlLabel
              label="GST Applicable"
              control={
                <Checkbox
                  checked={isGSTApplicable}
                  onChange={handleChange}
                  name="isGST"
                  color="primary"
                />
              }
            />
            <TextBox
              label="GST Number"
              value={clientInfo.GSTNumber}
              name="GSTNumber"
              onChange={handleTextBoxChange}
              disabled={!isGSTApplicable}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={pushData}
              disabled={
                (clientInfo && !clientInfo?.clientName?.length) ||
                !clientInfo?.clientAddress?.length ||
                (isGSTApplicable && !clientInfo?.GSTNumber?.length)
              }
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={8}>
            {rows?.length ? (
              <DataTable rows={rows} columns={clientColumns} />
            ) : null}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
