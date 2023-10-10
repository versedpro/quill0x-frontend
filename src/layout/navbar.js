import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useMetaMask } from "metamask-react";
import { petition_abi } from "../petition_abi"
import Web3, { utils } from 'web3';
const web3 = new Web3(window.ethereum);
const petitionAddress = '0xe44c1915C6E537745A6a0Dd23AdDFA62649e59d0';

function ConnectWalletButton() {
  const { status, account, connect, ethereum } = useMetaMask();

  const handleClick = () => {
    console.log("Wallet connection clicked");
    if (status !== 'connected') {
      connect();
      console.log("Wallet connected");
    }
  };

  return (
    <Button
      sx={{
        background: "#D32F28",
        color: "#FFFFFF",
        fontSize: "22px",
        textTransform: "none",
        border: "2px solid white",
        borderRadius: "8%", 
        ":hover": { background: "#D32F28" },
      }}
      onClick={handleClick}
    >
      <b>
      {status !== 'connected'
        ? "Connect Wallet"
        : account?.substring(0, 4) + "..." + account?.substring(account.length - 4)
      }
      </b>
    </Button>
  );
}


function SignPetitionButton() {
  const { account } = useMetaMask();
  // if(account == null) return;
  const contract = new web3.eth.Contract(petition_abi, petitionAddress);
  const [isSigned, setIsSigned] = useState(null);

  useEffect(() => {
    if (account != null) {
      contract.methods.isSigned(account).call()
        .then(result => {
          setIsSigned(result);
        })
        .catch(error => {
          console.error('Error occurred:', error);
          // Handle error
        });
    }
  }, [account]);


  const handleClick = async () => {
    const data = contract.methods.signPetition().encodeABI();
    const transactionObject = {
      from: account, // Replace with your actual sender address
      to: petitionAddress,
      value: 0,
      data: data,
    };
    try {
      await contract.methods.signPetition().send(transactionObject)
        .on('transactionHash', hash => {
          console.log('Transaction hash:', hash);
          // Handle transaction hash
        })
        .on('receipt', receipt => {
          console.log('Transaction receipt:', receipt);
          // Handle success
        })
    } catch (error) {
      console.error("Error signing the petition:", error);
    }

  }

  return (
    
    <Button
      sx={{
        background: "transparent",
        color: "#FFFFFF",
        fontSize: "22px",
        fontWeight: '500',
        textTransform: "none",
        ":hover": { background: "transparent" },
      }}
      onClick={handleClick}
    >
      <b>{isSigned ? "You are Signer of this petition" : "Sign Petition"}</b> 
    </Button>

    
  );
}
function AirdropButton() {
  
  return (
    
    <Button
      sx={{
        background: "transparent",
        color: "#FFFFFF",
        fontSize: "22px",
        fontWeight: '500',
        textTransform: "none",
        ":hover": { background: "transparent" },
      }}
      
    >
      <b>Airdrop</b> 
    </Button>
  );
}
function AboutButton() {
  
  return (
    
    <Button
      sx={{
        background: "transparent",
        color: "#FFFFFF",
        fontSize: "22px",
        fontWeight: '500',
        textTransform: "none",
        ":hover": { background: "transparent" },
      }}
      
    >
      <b>About</b> 
    </Button>
  );
}
const Navbar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "80px",
        zIndex: "100",
        border: "2px solid #9c06f7",
        backdropFilter: "blur(5px)",
      }}
    >
      <Container
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "UsdebtFont",
            fontSize: "48px",
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#D32F28",
            fontWeight: "900",
          }}
        >
           <span style={{ textShadow: "2px 0px 1px rgba(150, 150, 150, 0.9)" }}>
          <b>USDEBT</b>
        </span>
        </Typography>
        <Box
          gap={"10px"}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SignPetitionButton />
          <AirdropButton />
          <AboutButton />
          <ConnectWalletButton />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
