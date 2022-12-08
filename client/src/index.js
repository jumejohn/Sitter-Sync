import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { grey } from "@mui/material/colors";

const MyTheme = createTheme({
  typography: {
    fontFamily: ["Archivo Narrow", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: grey[100],
    },
    secondary: {
      main: "#d88080",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#84d9bf",
          borderBottom: "2px solid black",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {},
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          alignContent: "space-evenly",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          letterSpacing: 1,
          fontSize: 18,
          color: grey[900],
          fontWeight: "800",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={MyTheme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
