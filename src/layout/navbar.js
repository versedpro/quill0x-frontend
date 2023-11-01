import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Container, Typography, Input } from "@mui/material";
import { Menu, Close, Logout } from "@mui/icons-material";

import queryString from 'query-string';

import { goerli } from 'viem/chains';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import axios from 'axios';

function ConnectTwitterButton({ showMobileMenu, setShowMobileMenu }) {

  const location = useLocation();
  const navigate = useNavigate();

  const { address } = useAccount()

  const [twitterName, setTwitterName] = useState('');
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {

    console.log("nav location:", location);
    const parsed = queryString.parse(location.search);
    console.log("nav twitter_name referral_code", parsed.twitter_name, parsed.referral_code);

    if (parsed.twitter_name) {
      console.log("nav from url twitter_name", parsed.twitter_name);
      localStorage.setItem('twitter_name', parsed.twitter_name);
      setTwitterName(parsed.twitter_name);
    } else {
      const twitterName = localStorage.getItem('twitter_name');
      console.log("from storage twitter_name", twitterName);
      if (twitterName) {
        setTwitterName(twitterName);
      }
    }

    if (parsed.referral_code) {
      console.log("nav from url referral_code", parsed.referral_code);
      localStorage.setItem('referral_code', parsed.referral_code);
      setReferralCode(parsed.referral_code);
    } else {
      const referralCode = localStorage.getItem('referral_code');
      console.log("from storage referral_code", referralCode);
      if (referralCode) {
        setReferralCode(referralCode);
      }
    }
  }, [])

  useEffect(() => {
    if (twitterName) {
      if (address) {
        attachWallet(twitterName, address);
      }
    }
  }, [twitterName, address])

  const attachWallet = async (twitterName, address) => {
    console.log("attachWallet", twitterName, address);
    try {
      const res = await axios.post("https://auth.petitions3.com/api/user/wallet", null, { params: { twitterName, address } });
      console.log("attach wallet res:", res);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = () => {
    console.log("Twitter connection clicked");
    setShowMobileMenu(false);
    if (!twitterName) {
      navigate("/twitter_login");
    } else {
      localStorage.removeItem('twitter_name');
      localStorage.removeItem('referral_code');

      setTwitterName('');
      setReferralCode('');

      window.location.href = (new URL(window.location.href)).origin;
      navigate(location.pathname);
    }
  };

  return (
    <Button
      sx={{
        height: '40px',
        width: `${showMobileMenu ? "100%" : "auto"}`,
        background: "transparent",
        color: "#ffffff",
        fontSize: "22px",
        textTransform: "none",
        fontWeight: "500",
        border: "1px solid #ffffff",
        borderRadius: "8px",
        ":hover": { background: "#5CD7DD" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "0px 20px",
        textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)",
        letterSpacing: '0px',
      }}
      onClick={handleClick}
    >
      {twitterName ?
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Logout />
          <Typography
            sx={{
              fontSize: "22px",
              textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)",
              letterSpacing: '0px',
            }}
          >Logout</Typography>
        </Box> :
        <Typography
          sx={{
            fontSize: "22px",
            textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)",
            letterSpacing: '0px',
          }}
        >Login</Typography>
      }
    </Button>
  );
}

function ConnectWalletButton({ showMobileMenu, setShowMobileMenu }) {

  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new MetaMaskConnector({
      chains: [goerli],
    }),
  })
  const { disconnect } = useDisconnect()

  const handleClick = () => {
    console.log("Wallet connection clicked");
    setShowMobileMenu(false);
    if (!isConnected) {
      connect();
      console.log("Wallet connected");
    } else {
      disconnect();
      console.log("Wallet connected");
    }
  };

  return (
    <Button
      sx={{
        height: '40px',
        width: `${showMobileMenu ? "100%" : "auto"}`,
        background: "transparent",
        color: "#ffffff",
        fontSize: "22px",
        textTransform: "none",
        fontWeight: "500",
        border: "1px solid #ffffff",
        borderRadius: "8px",
        ":hover": { background: "#5CD7DD" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "0px 20px",
        textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)",
        letterSpacing: '0px',
      }}
      onClick={handleClick}
    >
      {!isConnected
        ? "ConnectWallet"
        : ensName ?? address?.substring(0, 4) + "..." + address?.substring(address.length - 4)
      }
    </Button>
  );
}

function SignPetitionButton({ showMobileMenu, setShowMobileMenu }) {

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
      onClick={(e) => { setShowMobileMenu(false) }}
    >
      Sign Petition
    </Button>
  );
}

function LitepaperButton({ showMobileMenu, setShowMobileMenu }) {

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
        onClick={(e) => { setShowMobileMenu(false); }}
        sx={{
          background: "transparent",
          color: "#ffffff",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
        }}
      >
        LitePaper
      </Button>
    </Box>
  );
}

function AirdropButton({ showMobileMenu, setShowMobileMenu }) {

  const navigate = useNavigate();

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
        onClick={(e) => { navigate("/leaderboard"); setShowMobileMenu(false); }}
        sx={{
          background: "transparent",
          color: "#ffffff",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
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

function AboutButton({ showMobileMenu, setShowMobileMenu }) {

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
        onClick={(e) => { setShowMobileMenu(false); }}
        sx={{
          background: "transparent",
          color: "#ffffff",
          fontSize: { xs: `${showMobileMenu ? "22px" : "18px"}`, md: "22px" },
          fontWeight: "400",
          textTransform: "none",
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
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

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  return (
    <>
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
          backgroundColor: `${showMobileMenu ? "#000" : "transparent"}`,
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
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                img: { width: "40px", objectFit: "contain" }
              }}
            >
              <img src="/P3WebAppLogo.png" alt="logo" />
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
            </Box>
            {!showMobileMenu ?
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px'
                }}
              >
                <AirdropButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <LitepaperButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <AboutButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
              </Box> :
              <></>
            }
          </Box>
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
                {/* <SignPetitionButton showMobileMenu={showMobileMenu} /> */}
                <Menu
                  sx={{
                    color: "#8f8f8f",
                    fontSize: "30px",
                    display: { xs: 'block', md: 'none' }
                  }}
                  onClick={(e) => { setShowMobileMenu(true) }}
                />
                <ConnectWalletButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <ConnectTwitterButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
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
            {/* <SignPetitionButton showMobileMenu={showMobileMenu} /> */}
            <AirdropButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <LitepaperButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <AboutButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <ConnectWalletButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <ConnectTwitterButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
          </Container> :
          <></>
        }
      </Box>
      {showPassword ?
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: "blur(5px)",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '100'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: 'black',
              borderRadius: '30px',
              boxShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)",
              padding: '15px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: "28px",
                fontWeight: '500',
                color: "#FFFFFF",
              }}
            >
              Password
            </Typography>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
              sx={{
                color: 'white',
                width: '100%',
                border: 'solid 1px white',
                borderRadius: '5px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
            />
            <Button
              sx={{
                background: "#ba0d0d",
                color: "#FFFFFF",
                fontSize: "16px",
                textTransform: "none",
                border: "2px solid white",
                borderRadius: "10px",
                ":hover": { background: "#D32F28" },
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                paddingTop: '5px',
                paddingBottom: '5px'
              }}
              onClick={(e) => { if (password == "petition333") setShowPassword(false); }}
            >
              OK
            </Button>
          </Box>
        </Box> :
        <></>
      }
    </>
  );
};

export default Navbar;
