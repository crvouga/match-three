import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#212121",
    },
  },
});

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};
