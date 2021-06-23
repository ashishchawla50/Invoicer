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
import { TextBox } from "../TextBox";

export const Transactions = () => {
  React.useEffect(() => {
    console.log("Transactions Called");
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
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
  const transactionColumns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "clientName", headerName: "Client Name", width: 150 },
    { field: "clientAddress", headerName: "Client Address", width: 150 },
    { field: "GSTNumber", headerName: "GST Number", width: 150 },
  ];

  const initTransactionColumnsInfo = {
    id: -1,
    invoiceCode: "",
    invoiceDate: new Date().toLocaleDateString(),
    clientName: "",
    accountName: "",
    items: [],
    totalNoTax: 0,
    SGST: 0,
    CGST: 0,
    total: 0,
  };
  const oldEntry = localStorage.getItem("transactions");

  const [transactionInfo, setTransactionInfo] = useState(
    initTransactionColumnsInfo
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [isParticularValid, setIsParticularValid] = React.useState(false);

  const [rows, setRows] = React.useState<any>(
    oldEntry ? JSON.parse(oldEntry) : initTransactionColumnsInfo
  );

  const [age, setAge] = React.useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTransactionInfo((prevState: any) => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  const pushData = () => {
    const row: any = rows?.length ? [...rows] : [];
    const isGST =
      client?.find((e: any) => e.id == transactionInfo.clientName)?.GSTNumber &&
      account?.find((e: any) => e.id == transactionInfo.accountName)?.GSTNumber;
    row.push({
      id: row?.length + 1 || 1,
      invoiceCode: transactionInfo.invoiceCode || "",
      invoiceDate:
        transactionInfo.invoiceDate || new Date().toLocaleDateString(),
      clientName: transactionInfo.clientName || "",
      accountName: transactionInfo.accountName || "",
      items: transactionInfo?.items || [],
      totalNoTax: transactionInfo?.totalNoTax || 0,
      SGST: isGST ? transactionInfo?.SGST : 0 || 0,
      CGST: isGST ? transactionInfo?.CGST : 0 || 0,
      total: transactionInfo?.total || 0,
    });
    setRows(row);
    localStorage.setItem("transactions", JSON.stringify(row));
    setTransactionInfo(initTransactionColumnsInfo);
  };

  const handleDatesChange = (e: any, name: string) => {
    const date = "" + e.getDate() + "/" + e.getMonth() + "/" + e.getFullYear();
    setTransactionInfo((prevState: any) => {
      const newState = { ...prevState };
      newState[name] = date;
      return newState;
    });
  };
  const handleTextBoxChange = (e: any) => {
    const { name, value } = e.target;
    setTransactionInfo((prevState: any) => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  useEffect(() => {
    calculateTotalTax(transactionInfo?.items);
  }, [transactionInfo.clientName, transactionInfo.accountName]);
  const calculateTotalTax = (items: any) => {
    const totalAmtWithoutTax = (loadTotal(items) as number) || 0;
    const SGST = (loadTotal(items, TAX) as number) || 0;
    const CGST = (loadTotal(items, TAX) as number) || 0;
    let total = 0;
    if (
      client?.find((e: any) => e.id == transactionInfo.clientName)?.GSTNumber &&
      account?.find((e: any) => e.id == transactionInfo.accountName)?.GSTNumber
    ) {
      total = (loadTotal(items, NOTAX, true) as number) || 0;
    } else {
      total = (loadTotal(items) as number) || 0;
    }
    setTransactionInfo((prevState: any) => {
      const newState = { ...prevState };
      prevState["items"] = items;
      newState["items"] = items;
      newState["totalNoTax"] = totalAmtWithoutTax;
      newState["SGST"] = SGST;
      newState["CGST"] = CGST;
      newState["total"] = total;
      return newState;
    });
  };

  const handleItemsValidation = (isItemValid: boolean, items: any) => {
    setIsParticularValid(isItemValid);
    setAmount(items);
    calculateTotalTax(items);
  };

  let client: any = localStorage.getItem("client");
  client = JSON.parse(client);
  let account: any = localStorage.getItem("account");
  account = JSON.parse(account);

  //console.log(client, account);
  const [amount, setAmount] = useState<any>();
  const history: any = useHistory();
  useEffect(() => {
    console.log(transactionInfo);
  }, [transactionInfo]);

  const loadTotal = (items: any, tax: number = 1, totalWithTax = false) => {
    const calculateTotal = () => {
      return (
        (Object.values(items).reduce(
          (t: any, v: any) => t + v?.amount,
          0
        ) as number) * tax || 0
      );
    };
    return totalWithTax
      ? calculateTotal() + calculateTotal() * TAX + calculateTotal() * TAX
      : calculateTotal();
  };
  const loadAmountss = (items: any) => {
    return Object.values(items).reduce((t: any, v: any) => t + v.amount, 0);
  };
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box p={1}>
              Manage trancations{" "}
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextBox
                  label="Invoice Code"
                  value={transactionInfo.invoiceCode}
                  onChange={handleTextBoxChange}
                  name="invoiceCode"
                />
              </Grid>
              <Grid item xs={6}>
                {/* <TextBox
                  label="Invoice Date"
                  value={transactionInfo.invoiceDate}
                  name="invoiceDate"
                  onChange={handleTextBoxChange}
                /> */}
                <Box className={classes.dateWrapper}>
                  <DatePicker
                    onChange={(e) => handleDatesChange(e, "invoiceDate")}
                    value={value}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box className={classes.selectBox}>
                  <label>Client</label>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={transactionInfo.clientName}
                    onChange={handleChange}
                    name="clientName"
                  >
                    {client?.map((item: any) => {
                      return (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.clientName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.selectBox}>
                  <label>Account</label>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={transactionInfo.accountName}
                    onChange={handleChange}
                    name="accountName"
                  >
                    {account?.map((item: any) => {
                      return (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.accountName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  {transactionInfo?.clientName &&
                  transactionInfo?.accountName ? (
                    <Particulars
                      handleItemsValidation={handleItemsValidation}
                    />
                  ) : null}
                </Box>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={pushData}
              disabled={
                !transactionInfo.invoiceCode.length ||
                !transactionInfo.invoiceDate.length ||
                !isParticularValid ||
                !transactionInfo.clientName ||
                !transactionInfo.accountName
              }
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={6}>
            {/* <pre>{JSON.stringify(transactionInfo, null, 2)}</pre> */}

            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {client?.find((e: any) => e.id == transactionInfo.clientName)
                    ?.GSTNumber &&
                  account?.find((e: any) => e.id == transactionInfo.accountName)
                    ?.GSTNumber ? (
                    <>
                      <tr>
                        <td>Total Without Tax</td>
                        <td>{transactionInfo?.totalNoTax || 0}</td>
                      </tr>
                      <tr>
                        <td>SGST</td>
                        <td>{transactionInfo?.SGST || 0}</td>
                      </tr>
                      <tr>
                        <td>CGST</td>
                        <td>{transactionInfo?.CGST || 0}</td>
                      </tr>
                      <tr>
                        <td>total</td>
                        <td>{transactionInfo?.total || 0}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td>total</td>
                      <td>{transactionInfo?.total || 0}</td>
                    </tr>
                  )}
                </>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
