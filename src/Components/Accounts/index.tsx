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
import Dailog from "../Dailog";
import DataTable from "../DataTable";
import { TextBox } from "../TextBox";

export const Accounts = () => {
  React.useEffect(() => {
    console.log("Accounts Called");
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

  const accountColumns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "accountName", headerName: "Account Name", width: 150 },
    { field: "accountAddress", headerName: "Account Address", width: 150 },
    { field: "GSTNumber", headerName: "GST Number", width: 150 },
    {
      field: "bankDetails",
      headerName: "Bank Details",
      width: 150,
      renderCell: (rowData: any) => {
        return <div onClick={() => viewDetailHanlder(rowData)}>View</div>;
      },
    },
  ];
  const initAccountInfo = {
    id: -1,
    accountName: "",
    accountAddress: "",
    PAN: "",
    GSTNumber: "",
    accountNo: "",
    bankName: "",
    bankBranch: "",
    IFSCCode: "",
  };
  const viewDetailHanlder = (rowData: any) => {
    if (rows.filter((e: any) => e.id == rowData.id)) {
      setDialogData({
        open: true,
        data: rows.filter((e: any) => e.id == rowData.id),
      });
    }
  };

  const [isGSTApplicable, setIsGSTApplicable] = React.useState(false);
  const oldEntry = localStorage.getItem("account");
  const [accountInfo, setAccountInfo] = useState(initAccountInfo);

  const [rows, setRows] = React.useState<any>(
    oldEntry ? JSON.parse(oldEntry) : initAccountInfo
  );

  const [dialogData, setDialogData] = React.useState({
    open: false,
    data: "",
  });

  const handleChange = (event: any) => {
    const { name, checked } = event.target;
    setAccountInfo((prevState: any) => {
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
      accountName: accountInfo.accountName,
      accountAddress: accountInfo.accountAddress,
      PAN: accountInfo.PAN,
      GSTNumber: accountInfo.GSTNumber,
      accountNo: accountInfo.accountNo,
      bankName: accountInfo.bankName,
      bankBranch: accountInfo.bankBranch,
      IFSCCode: accountInfo.IFSCCode,
    });
    setRows(row);
    localStorage.setItem("account", JSON.stringify(row));
    console.log(sessionStorage);
    setIsGSTApplicable(false);
    setAccountInfo(initAccountInfo);
  };
  const handleDialogClose = () => {
    setDialogData({
      open: false,
      data: "",
    });
  };
  const handleTextBoxChange = (e: any) => {
    const { name, value } = e.target;
    setAccountInfo((prevState: any) => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };
  return (
    <>
      {dialogData.open ? (
        <Dailog dialogData={dialogData} handleDialogClose={handleDialogClose} />
      ) : null}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box p={1}>Manage Accounts</Box>
            <TextBox
              label="Account Name"
              value={accountInfo.accountName}
              onChange={handleTextBoxChange}
              name="accountName"
            />
            <TextBox
              label="Account Address"
              value={accountInfo.accountAddress}
              onChange={handleTextBoxChange}
              name="accountAddress"
              isTextArea={true}
            />
            <TextBox
              label="PAN"
              value={accountInfo.PAN}
              onChange={handleTextBoxChange}
              name="PAN"
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
              value={accountInfo.GSTNumber}
              name="GSTNumber"
              onChange={handleTextBoxChange}
              disabled={!isGSTApplicable}
            />
            <TextBox
              label="Account Number"
              value={accountInfo.accountNo}
              onChange={handleTextBoxChange}
              name="accountNo"
              type="number"
            />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextBox
                  label="Bank Name"
                  value={accountInfo.bankName}
                  name="bankName"
                  onChange={handleTextBoxChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextBox
                  label="Bank Branch"
                  value={accountInfo.bankBranch}
                  name="bankBranch"
                  onChange={handleTextBoxChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextBox
                  label="IFSC Code"
                  value={accountInfo.IFSCCode}
                  name="IFSCCode"
                  onChange={handleTextBoxChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={pushData}
              disabled={
                !accountInfo.accountName.length ||
                !accountInfo.accountAddress.length ||
                !accountInfo.PAN.length ||
                !accountInfo.accountNo.length ||
                !accountInfo.bankName.length ||
                !accountInfo.bankBranch.length ||
                !accountInfo.IFSCCode.length ||
                (isGSTApplicable && !accountInfo.GSTNumber.length)
              }
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={8}>
            {rows?.length ? (
              <DataTable rows={rows} columns={accountColumns} />
            ) : null}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
