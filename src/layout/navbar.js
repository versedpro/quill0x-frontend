import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useMetaMask } from "metamask-react";

function ConnectWalletButton({ showMobileMenu }) {
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
        width: `${showMobileMenu ? "100%" : "auto"}`,
        background: "#0d5044",
        color: "#FFFFFF",
        fontSize: "22px",
        textTransform: "none",
        fontWeight: "400",
        border: "1px solid white",
        borderRadius: "8px",
        ":hover": { background: "#4af080" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "1px 20px",
        textShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)"
      }}
      onClick={handleClick}
    >
      {status !== 'connected'
        ? "Connect"
        : account?.substring(0, 4) + "..." + account?.substring(account.length - 4)
      }
    </Button>
  );
}


function SignPetitionButton({ showMobileMenu }) {

  return (
    <Button
      sx={{
        background: "transparent",
        color: "#FFFFFF",
        fontSize: "22px",
        fontWeight: "400",
        textTransform: "none",
        ":hover": { background: "transparent" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        textShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)"
      }}
      onClick={(e)=> {}}
    >
      Sign Petition
    </Button>
  );
}

function AirdropButton({ showMobileMenu }) {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      {/* {!showMobileMenu ?
        <Box
          sx={{
            height: "20px",
            width: "4px",
            borderRadius: "5px",
            border: "1px solid #8f8f8f",
            backgroundColor: "#ff00f6",
            display: { xs: 'block', md: 'none' }
          }}
        >
        </Box> :
        <></>
      } */}
      <Button
        sx={{
          background: "transparent",
          color: "#FFFFFF",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)"
        }}
      >
        Airdrop
      </Button>
    </Box>
  );
}

function AboutButton({ showMobileMenu }) {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      {/* {!showMobileMenu ?
        <Box
          sx={{
            height: "20px",
            width: "4px",
            borderRadius: "5px",
            border: "1px solid #8f8f8f",
            backgroundColor: "#ff00f6",
            display: { xs: 'block', md: 'none' }
          }}
        >
        </Box> :
        <></>
      } */}
      <Button
        sx={{
          background: "transparent",
          color: "#FFFFFF",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)"
        }}
      >
        About
      </Button>
    </Box>
  );
}

const Navbar = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        height: `${showMobileMenu ? "100vh" : "80px"}`,
        display: "flex",
        flexDirection: "column",
        zIndex: "100",
        '.MuiButton-root': {
          fontFamily: "MontserratFont"
        },
        paddingRight: { md: "100px", xs: "30px" },
        paddingLeft: { md: "100px", xs: "30px" },
      }}
    >
      <Container
        sx={{
          height: "80px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1600px!important",
          backgroundColor: "#111111",
          paddingRight: {md: '15px!important', xs: '5px!important'},
          paddingLeft: {md: '15px!important', xs: '5px!important'}
        }}
      >
        <Typography
          sx={{
            // fontFamily: "UsdebtFont!important",
            fontSize: { xs: "32px", md: "36px" },
            color: "white",
            fontWeight: "400",
          }}
        >
          <span style={{ textShadow: "2px 0px 1px rgba(150, 150, 150, 0.9)" }}>
            Aware3
          </span>
        </Typography>
        <Box
          sx={{
            gap: { xs: "0px", md: "10px" },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!showMobileMenu ?
            <>
              <SignPetitionButton showMobileMenu={showMobileMenu} />
              <Menu
                sx={{
                  color: "#8f8f8f",
                  fontSize: "30px",
                  display: { xs: 'block', md: 'none' }
                }}
                onClick={(e) => { setShowMobileMenu(true) }}
              />
              <AirdropButton showMobileMenu={showMobileMenu} />
              <AboutButton showMobileMenu={showMobileMenu} />
              <ConnectWalletButton showMobileMenu={showMobileMenu} />
            </> :
            <Close
              sx={{
                color: "#8f8f8f",
                fontSize: "30px"
              }}
              onClick={(e) => { setShowMobileMenu(false) }}
            />
          }
        </Box>
      </Container>
      {showMobileMenu ?
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <SignPetitionButton showMobileMenu={showMobileMenu} />
          <AirdropButton showMobileMenu={showMobileMenu} />
          <AboutButton showMobileMenu={showMobileMenu} />
          <ConnectWalletButton showMobileMenu={showMobileMenu} />
        </Container> :
        <></>
      }
    </Box>
  );
};

export default Navbar;
