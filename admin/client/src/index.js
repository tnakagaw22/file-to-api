import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Amplify from 'aws-amplify'

import { GlobalProvider } from "./context/GlobalContext";
import Pages from "./pages/Index";
import theme from "./theme";
import config from "./config";

console.log(config)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalProvider>
      <CssBaseline />
      <Pages />
    </GlobalProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
