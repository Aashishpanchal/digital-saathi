import AppRouter from "./routers/AppRouter";
import InformationModal from "./components/modals/InformationModal";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import LoadingDialogBox from "./components/dialog-box/loading-dialog-box";
import { SnackbarProvider } from "notistack";

export default function App() {
  const {
    modalSlice: { informationModal },
    adminSlice: { pageLoading },
  } = useSelector((state: RootState) => state);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <AppRouter />
        </SnackbarProvider>
        {/* add information modal */}
        <InformationModal {...informationModal} />
        <LoadingDialogBox open={pageLoading} />
      </div>
    </ThemeProvider>
  );
}
