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
import {
  useLocation
} from "react-router-dom"
import React from "react"
import axios from "axios"
import qs from "qs"



export default function App() {
  const { search } = useLocation()
  const [refreshToken, setRefreshToken] = React.useState("")




  React.useEffect(() => {
    const refreshToken = search.split("=")[1]
    setRefreshToken(refreshToken)
  }, [])


  const {
    adminSlice: { pageLoading },
  } = useSelector((state: RootState) => state);

  React.useEffect(() => {
    if (refreshToken) {

      const data1 = {
        grant_type: "refresh_token",
        redirect_uri: "https://digitalsaathi-cms.cglcloud.com/login",
        scope: "offline_access openid profile",
        refresh_token: refreshToken,
        client_id: "0oauvcg8f8ccy7CBU0h7"
      }
      axios.post("https://cargillcustomer-qa.oktapreview.com/oauth2/aushb5mlqe4IiZu3k0h7/v1/token", qs.stringify(data1), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": "JSESSIONID=FE2FEF078D9A3009EC18B08AAC797497"
        }
      }).then(response => {
        if (response.data) {
          response.data.access_token && localStorage.setItem("access_token", response.data.access_token)
          response.data.refresh_token && localStorage.setItem("refresh_token", response.data.refresh_token)
        }
      }).catch((err) => {
        console.log(err.response.data)
      })

    }
  }, [refreshToken])



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
