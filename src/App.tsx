import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Transactions } from "./Components/Transactions";
import { Accounts } from "./Components/Accounts";
import { Clients } from "./Components/Clients";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { TransactionsList } from "./Components/TransactionsList";
import { TransactionsGenerate } from "./Components/TransactionsGenerate";

function App() {
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

  return (
    <Container maxWidth={"lg"}>
      <Box className={classes.root} mt={2}>
        <Router>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={3} style={{ borderRight: " 1px solid #000" }}>
                <Paper
                  className={classes.paper}
                  elevation={0}
                  style={{ background: "transparent" }}
                >
                  <Navbar />
                </Paper>
              </Grid>
              <Grid item xs={9}>
                <Switch>
                  <Route
                    path="/transactions/list"
                    component={TransactionsList}
                    exact
                  />
                  <Route
                    path="/transactions/generate"
                    component={TransactionsGenerate}
                    exact
                  />
                  <Route path="/transactions" component={Transactions} exact />
                  <Route path="/accounts" component={Accounts} />
                  <Route path="/" exact component={Clients} />
                </Switch>
              </Grid>
            </Grid>
          </Paper>
        </Router>
      </Box>
    </Container>
  );
}

export default App;
