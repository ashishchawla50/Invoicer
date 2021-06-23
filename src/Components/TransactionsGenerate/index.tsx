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

export const TransactionsGenerate = () => {
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
    table: {
      border: "1px solid #000",
      "& td": {
        border: "1px solid #000",
      },
      "& th": {
        border: "1px solid #000",
      },
    },
  }));
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const TAX = 0.09;
  const NOTAX = 1;

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
          <div onClick={() => history?.push("/transactions/generate")}>
            Generate Invoice
          </div>
        );
      },
    },
  ];

  let client: any = localStorage.getItem("client");
  client = JSON.parse(client);
  let account: any = localStorage.getItem("account");

  account = JSON.parse(account);
  let activeClient: any = localStorage.getItem("activeClient");
  activeClient = JSON.parse(activeClient);
  let activeAccount: any = localStorage.getItem("activeAccount");
  activeAccount = JSON.parse(activeAccount);
  let activeTransaction: any = localStorage.getItem("activeTransaction");
  activeTransaction = JSON.parse(activeTransaction);

  // const rows = activeTransaction.map((transactionInfo: any) => {
  //   return {
  //     id: transactionInfo?.invoiceCode || "",
  //     invoiceCode: transactionInfo.invoiceCode || "",
  //     invoiceDate:
  //       transactionInfo.invoiceDate || new Date().toLocaleDateString(),
  //     clientName: transactionInfo.clientName || "",
  //     accountName: transactionInfo.accountName || "",
  //     items: transactionInfo?.items || [],
  //     totalNoTax: transactionInfo?.totalNoTax || 0,
  //     SGST: transactionInfo?.SGST || 0,
  //     CGST: transactionInfo?.CGST || 0,
  //     total: transactionInfo?.total || 0,
  //   };
  // });
  // console.log(rows);

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
            List Tranction | {activeTransaction?.invoiceCode} | Generate Invoice
          </Grid>
          <Grid item xs={6}>
            <Box>From</Box>
            <Box>{activeAccount && activeAccount[0].accountName}</Box>
            <Box>{activeAccount && activeAccount[0].accountAddress}</Box>
            <Box>
              GST No :
              {activeAccount && activeAccount[0].GSTNumber
                ? activeAccount && activeAccount[0].GSTNumber
                : "-"}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>To</Box>
            <Box>{activeClient && activeClient[0]?.clientName}</Box>
            <Box>{activeClient && activeClient[0]?.clientAddress}</Box>
            <Box>
              GST No :
              {activeClient && activeClient[0].GSTNumber
                ? activeClient && activeClient[0].GSTNumber
                : "-"}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>List</th>
                  <th>Desciption</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {activeTransaction?.items?.map((item: any) => (
                  <tr>
                    <td>{item?.id}</td>
                    <td>{item?.description}</td>
                    <td>{item?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={6}>
            <Box>Pay</Box>
            <Box>{activeAccount && activeAccount[0].accountName}</Box>
            <Box>Account no:{activeAccount && activeAccount[0].accountNo}</Box>
            <Box>
              Bank Name
              {activeAccount && activeAccount[0].bankName}
            </Box>
            <Box>
              Bank Branch
              {activeAccount && activeAccount[0].bankBranch}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>To</Box>
            <Box>CGST : {activeTransaction?.CGST}</Box>
            <Box>SGST :{activeTransaction?.SGST}</Box>
            <Box>Total :{activeTransaction?.total}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
