import {
  makeStyles,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Select,
  MenuItem,
  Table,
  Link,
} from "@material-ui/core";
import React, { useState } from "react";
import DataTable from "../DataTable";
import { TextBox } from "../TextBox";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-date-picker";
import Particulars from "../Particulars";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const TransactionsList = () => {
  React.useEffect(() => {
    console.log("Transactions Called");
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
    dateWrapper: {
      "& .react-date-picker": {
        padding: "8px",
        "& .react-date-picker__wrapper": {
          padding: "14px",
          borderRadius: "5px",
          border: "1px solid #bebdbd",
        },
      },
    },
    selectBox: {
      textAlign: "left",
      padding: "0 12px",
      "& label": {
        fontSize: 12,
      },
      "& .MuiInputBase-root": {
        width: "100%",
      },
    },
  }));
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const TAX = 0.09;
  const NOTAX = 1;

  let client: any = localStorage.getItem("client");
  client = JSON.parse(client);
  let account: any = localStorage.getItem("account");
  account = JSON.parse(account);
  let transactions: any = localStorage.getItem("transactions");
  transactions = JSON.parse(transactions);

  const history: any = useHistory();
  const transactionListColumns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "date", headerName: "ID", width: 130 },
    { field: "clientName", headerName: "Client Name", width: 150 },
    { field: "accountName", headerName: "Account Name", width: 150 },
    { field: "totalNoTax", headerName: "totalNoTax", width: 150 },
    { field: "SGST", headerName: "SGST", width: 150 },
    { field: "CGST", headerName: "CGST", width: 150 },
    { field: "total", headerName: "total", width: 150 },
    {
      field: "generate",
      headerName: "generate",
      width: 150,
      renderCell: (rowData: any) => {
        return (
          <div onClick={() => handleGenerate(rowData)}>Generate Invoice</div>
        );
      },
    },
  ];

  const handleGenerate = (rowData: any) => {
    const activeClient = client.filter(
      (e: any) => e.id == rowData.row.clientName
    );
    const activeAccount = account.filter(
      (e: any) => e.id == rowData.row.accountName
    );
    localStorage.setItem("activeClient", JSON.stringify(activeClient));
    localStorage.setItem("activeAccount", JSON.stringify(activeAccount));
    localStorage.setItem("activeTransaction", JSON.stringify(rowData.row));

    history?.push("/transactions/generate");
  };

  const rows = transactions?.map((transactionInfo: any) => {
    return {
      id: transactionInfo?.invoiceCode || "",
      invoiceCode: transactionInfo.invoiceCode || "",
      invoiceDate:
        transactionInfo.invoiceDate || new Date().toLocaleDateString(),
      clientName: transactionInfo.clientName || "",
      accountName: transactionInfo.accountName || "",
      items: transactionInfo?.items || [],
      totalNoTax: transactionInfo?.totalNoTax || 0,
      SGST: transactionInfo?.SGST || 0,
      CGST: transactionInfo?.CGST || 0,
      total: transactionInfo?.total || 0,
    };
  });
  console.log(rows);

  return (
    <>
      <Box p={1}>
        <Grid container spacing={3}>
          <Box p={2}>
            Manage trancations
            <span style={{ marginLeft: 16 }}>
              <Link href="#" onClick={() => history?.push("/transactions")}>
                Add a new tranction
              </Link>
            </span>
            <span style={{ marginLeft: 16 }}>
              <Link
                href="#"
                onClick={() => history?.push("/transactions/list")}
              >
                List Tranction
              </Link>
            </span>
          </Box>
          <Grid item xs={12}>
            {rows?.length ? (
              <DataTable rows={rows} columns={transactionListColumns} />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
