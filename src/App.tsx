import AppRouter from "./routers/AppRouter";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import LoadingDialogBox from "./components/dialog-box/loading-dialog-box";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react"
import axios from "axios"
import qs from "qs"

export default function App() {


  const {
    adminSlice: { pageLoading },
  } = useSelector((state: RootState) => state);

  React.useEffect(() => {
    axios.post("https://cargillcustomer-qa.oktapreview.com/oauth2/aushb5mlqe4IiZu3k0h7/v1/token", qs.stringify({
      grant_type: "password",
      redirect_uri: "https://digitalsaathi-cms.dev.cglcloud.in/login",
      username: "support@digitalsaathi.com",
      password: "tkq6exz.txv7qpu_PFN",
      scope: "openid profile email offline_access",
      client_id: "0oauvcg8f8ccy7CBU0h7"
    }), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "JSESSIONID=82716910C0B3A83A8C773C434FAE070F"
      }
    }).then(response => {
      console.log(response.data)
    })


  }, [])



  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <LoadingDialogBox open={pageLoading} />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
