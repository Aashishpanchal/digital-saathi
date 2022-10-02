import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { DialogContent, DialogContentText } from "@mui/material";

const CustomDialogBox = styled(Dialog)(({ theme }) => ({
  "& .MuiTypography-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ExclamationMarkIcon = styled(AiOutlineExclamationCircle)`
  color: #faad14;
  font-size: 1.6rem;
`;

export default function DeleteDialogBox(props: {
  open: boolean;
  onClickClose?: () => void;
  onClickOk?: () => void;
}) {
  const { onClickOk, open, onClickClose } = props;

  return (
    <CustomDialogBox
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ margin: 2 }}>
        <Box sx={{ display: "flex" }}>
          <DialogTitle id="alert-dialog-title">
            <ExclamationMarkIcon />
          </DialogTitle>
          <DialogContent>
            <DialogContentText fontWeight={"600"}>
              Are you sure delete this record?
            </DialogContentText>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button
            autoFocus
            onClick={onClickClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            color="secondary"
            variant="contained"
            size="small"
            onClick={onClickOk}
          >
            OK
          </Button>
        </DialogActions>
      </Box>
    </CustomDialogBox>
  );
}
