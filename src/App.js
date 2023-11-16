
import { Routes, Route } from "react-router";

import Navbar from "./layout/navbar";
import Home from "./layout/home";
import Landing from "./layout/landing";
import Leaderboard from "./layout/leaderboard";
import Footer from "./layout/footer";
import TwitterLogin from "./layout/twitter_login";

import { mainnet, goerli, base, baseGoerli } from 'viem/chains';
import { WagmiConfig } from 'wagmi'
import {
  createWeb3Modal,
  defaultWagmiConfig,
} from '@web3modal/wagmi/react'

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


const projectId = '32487a201756fc4239683ac0b3568cb9';

const chains = [goerli, baseGoerli, mainnet, base];

const metadata = {
  name: 'quill0x',
  description: 'Capital Quill0x',
  url: 'https://quill0x.com',
  icons: ['https://ipfs.io/ipfs/QmaiiRTnFLXyQQDWJET8XCnciXadb8Sf6vaDpmviMFuw6B']
}

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true,
  themeMode: 'dark'
})

function App() {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
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
