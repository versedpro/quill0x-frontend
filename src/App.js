
import Navbar from "./layout/navbar";
import Home from "./layout/home";

import { MetaMaskProvider } from "metamask-react";

import { createTheme, ThemeProvider } from "@mui/material";

export const themeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 391,
      md: 900,
      lg: 1200,
      xl: 1920
    }
  }
};

function App() {
  return (
    <>
      <MetaMaskProvider>
        <ThemeProvider theme={createTheme(themeOptions)}>
          <Navbar />
          <Home />
        </ThemeProvider>
      </MetaMaskProvider>
    </>
  );
}

export default App;
