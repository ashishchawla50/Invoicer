import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/core/Icon";
import { Grid } from "@material-ui/core";
import { TextBox } from "../TextBox";

const styles: any = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          size={"medium"}
          className={classes.closeButton}
          onClick={onClose}
        >
          x
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const Dailog = (props: any) => {
  const { dialogData } = props;
  const handleClose = () => {
    props.handleDialogClose();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props?.dialogData?.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Bank Details : {dialogData?.data[0].accountName}
        </DialogTitle>
        <DialogContent dividers>
          <TextBox
            label="Account Number"
            value={dialogData?.data[0].accountNo}
            disabled={true}
            type="number"
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextBox
                label="Bank Name"
                value={dialogData?.data[0].bankName}
                disabled={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TextBox
                label="Bank Branch"
                value={dialogData?.data[0].bankBranch}
                disabled={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TextBox
                label="IFSC Code"
                value={dialogData?.data[0].IFSCCode}
                disabled={true}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(Dailog);
