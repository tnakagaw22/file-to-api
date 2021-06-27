import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { GlobalProvider } from "./context/GlobalContext";
import Pages from "./pages/Index";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalProvider>
      <CssBaseline />
      <Pages />
    </GlobalProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
