
import { Routes, Route } from "react-router";

import Navbar from "./layout/navbar";
import Home from "./layout/home";
import Landing from "./layout/landing";
import Leaderboard from "./layout/leaderboard";
import Footer from "./layout/footer";
import TwitterLogin from "./layout/twitter_login";

import { goerli, mainnet } from 'viem/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from "wagmi/providers/public";

import { createTheme, ThemeProvider } from "@mui/material";

export const themeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 391,
      md: 1000,
      lg: 1400,
      xl: 1920
    }
  }
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: 'oad0JCDVOhPo7Lmd1RMehRhABPr4Adj9' }), publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

function App() {
  return (
    <>
      <WagmiConfig config={config}>
        <ThemeProvider theme={createTheme(themeOptions)}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/twitter_login" element={<TwitterLogin />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
