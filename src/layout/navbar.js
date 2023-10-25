import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useMetaMask } from "metamask-react";
import queryString from 'query-string';

import axios from 'axios';

function ConnectTwitterButton({ showMobileMenu }) {

  const location = useLocation();

  const [twitterName, setTwitterName] = useState('');

  useEffect(() => {

    console.log("location:", location);
    const parsed = queryString.parse(location.search);
    console.log("twitter_name", parsed.twitter_name);

    if (parsed.twitter_name) {
      console.log("from url twitter_name", parsed.twitter_name);
      localStorage.setItem('twitter_name', parsed.twitter_name);
      setTwitterName(parsed.twitter_name);
    } else {
      const twitterName = localStorage.getItem('twitter_name');
      console.log("from storage twitter_name", twitterName);
      if (twitterName) {
        setTwitterName(twitterName);
      }
    }
  }, [])

  const handleClick = () => {
    console.log("Twitter connection clicked");
    if (!twitterName) {
      connect();
    }
  };

  const connect = async () => {
    try {
      const res = await axios.post("http://54.193.123.201:8000/api/user/twitter/request");
      console.log("twitter request res:", res);

      window.location.href = new URL(res.data.url.Path + "?" + res.data.url.RawQuery, res.data.url.Scheme + "://" + res.data.url.Host).toString();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      sx={{
        width: `${showMobileMenu ? "100%" : "auto"}`,
        background: "transparent",
        color: "#ffffff",
        fontSize: "22px",
        textTransform: "none",
        fontWeight: "500",
        border: "1px solid #ffffff",
        borderRadius: "8px",
        ":hover": { background: "#5CD7DD", color: "#000" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "1px 20px",
        textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
      }}
      onClick={handleClick}
    >
      {twitterName ? twitterName : "T-Connect"}
    </Button>
  );
}

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
        background: "transparent",
        color: "#ffffff",
        fontSize: "22px",
        textTransform: "none",
        fontWeight: "500",
        border: "1px solid #ffffff",
        borderRadius: "8px",
        ":hover": { background: "#5CD7DD", color: "#000" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "1px 20px",
        textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
      }}
      onClick={handleClick}
    >
      {status !== 'connected'
        ? "W-Connect"
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
        color: "#ffffff",
        fontSize: "22px",
        fontWeight: "400",
        textTransform: "none",
        ":hover": { background: "transparent" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
      }}
      onClick={(e) => { }}
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
          color: "#ffffff",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
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
          color: "#ffffff",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
        }}
      >
        About
      </Button>
    </Box>
  );
}

const Navbar = () => {

  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        width: "100%",
        height: `${showMobileMenu ? "100vh" : "80px"}`,
        display: "flex",
        flexDirection: "column",
        zIndex: "100",
        '.MuiButton-root': {
          fontFamily: "RobotoMonoFont"
        },
        '.MuiTypography-root': {
          fontFamily: "RobotoMonoFont"
        },
        paddingRight: { md: "100px", xs: "10px" },
        paddingLeft: { md: "100px", xs: "10px" },
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
          background: "#33333310",
          backdropFilter: 'blur(10px)',
          paddingRight: { md: '15px!important', xs: '5px!important' },
          paddingLeft: { md: '15px!important', xs: '5px!important' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start'
          }}
        >
          <Typography
            onClick={(e) => { navigate("/") }}
            sx={{
              fontSize: { xs: "24px", md: "30px" },
              color: "#ffffff",
              fontWeight: "900",
              lineHeight: { xs: "20px", md: "30px" },
              letterSpacing: '0px',
              cursor: 'pointer'
            }}
          >
            <span style={{ textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)" }} >
              Petitions3
            </span>
          </Typography>
          {/* <Typography
            sx={{
              fontSize: { xs: "26px", md: "30px" },
              color: "#ffffff",
              fontWeight: "900",
              lineHeight: { xs: "26px", md: "30px" }
            }}
          >
            <span style={{ textShadow: "2px 0px 1px rgba(150, 150, 150, 0.9)" }} >
              3
            </span>
          </Typography> */}
        </Box>
        {/* <Box
          sx={{
            height: {md: '70px', xs: '40px'}
          }}
        >
          <img src="/petition3_logo.png" alt="p3_logo" style={{height: '100%'}} />
        </Box> */}
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
              <ConnectTwitterButton showMobileMenu={showMobileMenu} />
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
          <ConnectTwitterButton showMobileMenu={showMobileMenu} />
        </Container> :
        <></>
      }
    </Box>
  );
};

export default Navbar;
