
import { Routes, Route } from "react-router";

import Navbar from "./layout/navbar";
import Home from "./layout/home";
import Landing from "./layout/landing";
import Leaderboard from "./layout/leaderboard";
import Footer from "./layout/footer";
import TwitterLogin from "./layout/twitter_login";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { mainnet, goerli, base, baseGoerli } from 'viem/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from "wagmi/providers/public";

import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

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
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Petitions3',
        jsonRpcUrl: 'https://eth-goerli.g.alchemy.com/v2/oad0JCDVOhPo7Lmd1RMehRhABPr4Adj9',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '32487a201756fc4239683ac0b3568cb9',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

// const projectId = '32487a201756fc4239683ac0b3568cb9'
// const { chains, publicClient } = configureChains(
//   [goerli],
//   [walletConnectProvider({ projectId }), publicProvider()]
// )
// const metadata = {
//   name: 'Petitions3',
//   description: 'Petitions3',
//   url: 'https://petitions3.com',
//   icons: ['https://avatars.githubusercontent.com/u/37784886']
// }
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: [
//     new EIP6963Connector({ chains }),
//     new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
//     new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
//   ],
//   publicClient
// })
// createWeb3Modal({
//   wagmiConfig, projectId, chains
// })

function App() {
  return (
    <>
      <WagmiConfig config={config}>
        <ThemeProvider theme={createTheme(themeOptions)}>
          <Footer />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/twitter_login" element={<TwitterLogin />} />
          </Routes>
        </ThemeProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
