
import Navbar from "./layout/navbar";
import Home from "./layout/home";

import { MetaMaskProvider } from "metamask-react";

function App() {
  return (
    <>
    <MetaMaskProvider>
      <Navbar />
      <Home/>
      </MetaMaskProvider>
    </>
  );
}

export default App;
