import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Container, Typography, Input } from "@mui/material";
import { Menu, Close, Logout } from "@mui/icons-material";

import queryString from 'query-string';

import { mainnet, goerli, base, baseGoerli } from 'viem/chains';
import { useAccount, useChainId, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'

import axios from 'axios';

const chainLogo = {
  0: "https://chainlist.org/unknown-logo.png",
  1: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
  8453: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
}

function ConnectTwitterButton({ twitterName, showMobileMenu, setShowMobileMenu, setShowLogoutModal }) {

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Twitter connection clicked");
    setShowMobileMenu(false);
    if (!twitterName) {
      navigate("/twitter_login");
    } else {
      setShowLogoutModal(true);
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
        border: "1px solid #7DF9FF",
        borderRadius: "8px",
        ":hover": { background: "#5CD7DD" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "0px 20px",
        textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
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
              fontSize: "18px",
              textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
              letterSpacing: '0px',
            }}
          >{twitterName}</Typography>
        </Box> :
        <Typography
          sx={{
            fontSize: "18px",
            textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
            letterSpacing: '0px',
          }}
        >LOGIN</Typography>
      }
    </Button>
  );
}

function ConnectWalletButton({ showMobileMenu, setShowMobileMenu, setShowWalletModal, setShowDisconnectModal }) {

  const { open } = useWeb3Modal()

  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const chainId = useChainId();

  const handleClick = () => {
    console.log("Wallet connection clicked");
    setShowMobileMenu(false);
    if (isConnected) {
      // setShowDisconnectModal(true);
      open();
    } else {
      // setShowWalletModal(true);
      open();
    }
  };

  return (
    <>
      <Button
        sx={{
          height: '40px',
          width: `${showMobileMenu ? "100%" : "auto"}`,
          background: "transparent",
          color: "#ffffff",
          fontSize: "22px",
          textTransform: "none",
          fontWeight: "500",
          border: "1px solid #7DF9FF",
          borderRadius: "8px",
          ":hover": { background: "#5CD7DD" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          padding: "0px 20px",
          textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
          letterSpacing: '0px',
        }}
        onClick={() => { handleClick(); }}
      >
        {!isConnected ?
          <Typography
            sx={{
              fontSize: "18px",
              textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
              letterSpacing: '0px',
            }}
          >CONNECT WALLET</Typography> :
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' }
            }}
          >
            <img src={chainLogo[chainId] ? chainLogo[chainId] : chainLogo[0]} alt="chainLogo" />
            <Typography
              sx={{
                fontSize: "18px",
                textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
                letterSpacing: '0px',
              }}
            >{ensName ?? address?.substring(0, 4) + "..." + address?.substring(address.length - 4)}</Typography>
          </Box>
        }
      </Button>

    </>
  );
}

function SignPetitionButton({ showMobileMenu, setShowMobileMenu }) {

  return (
    <Button
      sx={{
        // width: '230px',
        background: "transparent",
        color: "#8f8f8f",
        fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        fontWeight: "400",
        textTransform: "none",
        ":hover": { background: "transparent", color: "white", textShadow: "0px 0px 5px #7DF9FF", }
      }}
      onClick={(e) => { setShowMobileMenu(false) }}
    >
      Sign Petition
    </Button>
  );
}

function CryptoPetitionButton({ showMobileMenu, setShowMobileMenu, setShowInnovationExplanation }) {

  const navigate = useNavigate();

  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <Box
      onMouseOver={() => setShowSubMenu(true)}
      onMouseOut={() => setShowSubMenu(false)}
      sx={{
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center'
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
        onClick={(e) => { }}
        sx={{
          width: '230px',
          background: "transparent",
          color: "#8f8f8f",
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent", color: "white", textShadow: "0px 0px 5px #7DF9FF", }
        }}
      >
        Crypto Petition
      </Button>
      {showSubMenu ?
        <Box
          sx={{
            position: `${showMobileMenu ? "unset" : "absolute"}`,
            top: '40px',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={(e) => { setShowMobileMenu(false); setShowInnovationExplanation(true); }}
            sx={{
              background: "transparent",
              color: "#ffffff",
              fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
              fontWeight: "400",
              textTransform: "none",
              display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
              ":hover": { background: "transparent" },
              textShadow: "0px 0px 5px #7DF9FF"
            }}
          >
            Innovations
          </Button>
          <Button
            onClick={(e) => { setShowMobileMenu(false); navigate("/home"); }}
            sx={{
              background: "transparent",
              color: "#ffffff",
              fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
              fontWeight: "400",
              textTransform: "none",
              display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
              ":hover": { background: "transparent" },
              textShadow: "0px 0px 5px #7DF9FF"
            }}
          >
            USDEBT Petition
          </Button>
        </Box> :
        <></>
      }
    </Box>
  );
}

function CommunityButton({ showMobileMenu, setShowMobileMenu }) {

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
          color: "#8f8f8f",
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "0px 0px 5px #7DF9FF"
        }}
      >
        Community
      </Button>
    </Box>
  );
}

function SocialCauseButton({ showMobileMenu, setShowMobileMenu }) {

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
          // width: '230px',
          background: "transparent",
          color: "#8f8f8f",
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent", color: "white", textShadow: "0px 0px 5px #7DF9FF", }
        }}
      >
        Social Cause
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
          // width: '230px',
          background: "transparent",
          color: "#8f8f8f",
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent", color: "white", textShadow: "0px 0px 5px #7DF9FF", }
        }}
      >
        Airdrop
      </Button>
    </Box>
  );
}

function AboutButton({ showMobileMenu, setShowMobileMenu }) {

  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <Box
      onMouseOver={() => setShowSubMenu(true)}
      onMouseOut={() => setShowSubMenu(false)}
      sx={{
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center'
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
        onClick={(e) => { }}
        sx={{
          // width: '230px',
          background: "transparent",
          color: "#8f8f8f",
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent", color: "white", textShadow: "0px 0px 5px #7DF9FF", }
        }}
      >
        About
      </Button>
      {showSubMenu ?
        <Box
          sx={{
            position: `${showMobileMenu ? "unset" : "absolute"}`,
            top: '40px',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={(e) => { setShowMobileMenu(false); }}
            sx={{
              background: "transparent",
              color: "#ffffff",
              fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
              fontWeight: "400",
              textTransform: "none",
              display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
              ":hover": { background: "transparent" },
              textShadow: "0px 0px 5px #7DF9FF"
            }}
          >
            Team
          </Button>
          <Button
            onClick={(e) => { setShowMobileMenu(false); }}
            sx={{
              background: "transparent",
              color: "#ffffff",
              fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
              fontWeight: "400",
              textTransform: "none",
              display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
              ":hover": { background: "transparent" },
              textShadow: "0px 0px 5px #7DF9FF"
            }}
          >
            Litepaper
          </Button>
        </Box> :
        <></>
      }
    </Box>
  );
}

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showInnovationExplanation, setShowInnovationExplanation] = useState(false);

  const { disconnect } = useDisconnect()
  const { connect, connectors } =
    useConnect()

  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const chainId = useChainId();

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
            paddingRight: { md: '100px!important', xs: '5px!important' },
            paddingLeft: { md: '100px!important', xs: '5px!important' }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '40px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                img: { width: "40px", objectFit: "contain" }
              }}
            >
              <img src="/petitions3.png" alt="logo" />
              <Typography
                onClick={(e) => { navigate("/") }}
                sx={{
                  fontSize: { xs: "24px", md: "30px" },
                  color: "#ffffff",
                  fontWeight: "900",
                  lineHeight: { xs: "20px", md: "30px" },
                  letterSpacing: '0px',
                  cursor: 'pointer',
                  span: { textShadow: { md: "0px 0px 5px #7DF9FF", xs: "0px 0px 1px #7DF9FF" } }
                }}
              >
                <span >
                  quill.0x
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
                <CryptoPetitionButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setShowInnovationExplanation={setShowInnovationExplanation} />
                <SocialCauseButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                <AirdropButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
                {/* <CommunityButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} /> */}
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
                <Box
                  sx={{
                    display: { md: 'none', xs: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: '10px',
                    img: { width: '25px', height: '25px', borderRadius: '100%', border: `${address ? "solid 2px #4ACC95" : "solid 2px #f00"}`, objectFit: 'contain', borderRadius: '100%' }
                  }}
                >
                  <img src={chainLogo[chainId] ? chainLogo[chainId] : chainLogo[0]} alt="chainLogo" />
                </Box>
                <Menu
                  sx={{
                    color: "#8f8f8f",
                    fontSize: "30px",
                    display: { xs: 'block', md: 'none' }
                  }}
                  onClick={(e) => { setShowMobileMenu(true) }}
                />
                <ConnectWalletButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setShowWalletModal={setShowWalletModal} setShowDisconnectModal={setShowDisconnectModal} />
                <ConnectTwitterButton twitterName={twitterName} showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setShowLogoutModal={setShowLogoutModal} />
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
            <CryptoPetitionButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setShowInnovationExplanation={setShowInnovationExplanation} />
            <SocialCauseButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <AirdropButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            {/* <CommunityButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} /> */}
            <AboutButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            <ConnectWalletButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setShowWalletModal={setShowWalletModal} setShowDisconnectModal={setShowDisconnectModal} />
            <ConnectTwitterButton twitterName={twitterName} showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setShowLogoutModal={setShowLogoutModal} />
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
            zIndex: '100',
            '.MuiButton-root': {
              fontFamily: "RobotoSlabFont"
            },
            '.MuiTypography-root': {
              fontFamily: "RobotoSlabFont"
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#1E1E1E',
              borderRadius: '8px',
              border: 'solid 2px #7DF9FF',
              padding: '15px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
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
                border: 'solid 2px #7DF9FF',
                borderRadius: '8px',
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
                border: "2px solid #7DF9FF",
                borderRadius: "8px",
                ":hover": { background: "#D32F28" },
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                paddingTop: '5px',
                paddingBottom: '5px'
              }}
              onClick={(e) => { if (password == "1234!!") setShowPassword(false); }}
            >
              OK
            </Button>
          </Box>
        </Box> :
        <></>
      }
      {showWalletModal ?
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
            zIndex: '100',
            '.MuiButton-root': {
              fontFamily: "RobotoSlabFont"
            },
            '.MuiTypography-root': {
              fontFamily: "RobotoSlabFont"
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#1E1E1E',
              borderRadius: '8px',
              border: 'solid 2px #7DF9FF',
              padding: '30px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
              width: { md: '35%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Close onClick={() => { setShowWalletModal(false) }} sx={{ position: 'absolute', top: '20px', right: '20px', color: '#888888', ':hover': { color: '#eeeeee' }, cursor: 'pointer' }} />
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: "24px",
                fontWeight: '500',
                color: "#FFFFFF",
              }}
            >
              Connect Wallet
            </Typography>

            <Box
              sx={{
                display: { md: 'none', xs: 'flex' },
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #7DF9FF",
                  borderRadius: "8px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { window.open('https://metamask.app.link/dapp/quill0x.com') }}
              >
                <img src="/wallet/mm.png" alt="" />
              </Button>
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #7DF9FF",
                  borderRadius: "8px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { setShowWalletModal(false); connect({ connector: connectors[1] }) }}
              >
                <img src="/wallet/cb.png" alt="" />
              </Button>
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #7DF9FF",
                  borderRadius: "8px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { setShowWalletModal(false); connect({ connector: connectors[2] }) }}
              >
                <img src="/wallet/wc.png" alt="" />
              </Button>
            </Box>
            <Box
              sx={{
                display: { md: 'flex', xs: 'none' },
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #7DF9FF",
                  borderRadius: "8px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { setShowWalletModal(false); connect({ connector: connectors[0] }) }}
              >
                <img src="/wallet/mm.png" alt="" />
              </Button>
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #7DF9FF",
                  borderRadius: "8px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { setShowWalletModal(false); connect({ connector: connectors[1] }) }}
              >
                <img src="/wallet/cb.png" alt="" />
              </Button>
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #7DF9FF",
                  borderRadius: "8px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { setShowWalletModal(false); connect({ connector: connectors[2] }) }}
              >
                <img src="/wallet/wc.png" alt="" />
              </Button>
            </Box>
          </Box>
        </Box> :
        <></>
      }
      {showDisconnectModal ?
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
            zIndex: '100',
            '.MuiButton-root': {
              fontFamily: "RobotoSlabFont"
            },
            '.MuiTypography-root': {
              fontFamily: "RobotoSlabFont"
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#1E1E1E',
              borderRadius: '8px',
              border: 'solid 2px #7DF9FF',
              padding: '30px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
              width: { md: '35%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: { md: "24px", xs: "20px" },
                fontWeight: '500',
                color: "#FFFFFF",
                textAlign: 'center'
              }}
            >
              Confirm wallet disconnection<br />{ensName ?? address?.substring(0, 4) + "..." + address?.substring(address.length - 4)}?
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'

              }}
            >
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  sx={{
                    width: "80%",
                    background: "#ff0000",
                    border: "2px solid #7DF9FF",
                    borderRadius: "8px",
                    ":hover": { background: "#ff000070" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#FFFFFF",
                    fontSize: { md: "16px", xs: "14px" },
                    textTransform: "none",
                  }}
                  onClick={() => { setShowDisconnectModal(false); disconnect() }}
                >
                  DISCONNECT
                </Button>
              </Box>
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  sx={{
                    width: "80%",
                    background: "#888888",
                    border: "2px solid #7DF9FF",
                    borderRadius: "8px",
                    ":hover": { background: "#88888870" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#333333",
                    fontSize: { md: "16px", xs: "14px" },
                    textTransform: "none",
                  }}
                  onClick={() => { setShowDisconnectModal(false); }}
                >
                  CANCEL
                </Button>
              </Box>
            </Box>
          </Box>
        </Box> :
        <></>
      }
      {showLogoutModal ?
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
            zIndex: '100',
            '.MuiButton-root': {
              fontFamily: "RobotoSlabFont"
            },
            '.MuiTypography-root': {
              fontFamily: "RobotoSlabFont"
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#1E1E1E',
              borderRadius: '8px',
              border: 'solid 2px #7DF9FF',
              padding: '30px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
              width: { md: '35%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: { md: "24px", xs: "20px" },
                fontWeight: '500',
                color: "#FFFFFF",
                textAlign: 'center'
              }}
            >
              Confirm logout from Quill0x?
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  sx={{
                    width: "80%",
                    background: "#ff0000",
                    border: "2px solid #7DF9FF",
                    borderRadius: "8px",
                    ":hover": { background: "#ff000070" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#FFFFFF",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setShowLogoutModal(false);
                    localStorage.removeItem('twitter_name');
                    localStorage.removeItem('referral_code');

                    setTwitterName('');
                    setReferralCode('');

                    window.location.href = (new URL(window.location.href)).origin;
                    navigate(location.pathname);
                  }}
                >
                  LOGOUT
                </Button>
              </Box>
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  sx={{
                    width: "80%",
                    background: "#888888",
                    border: "2px solid #7DF9FF",
                    borderRadius: "8px",
                    ":hover": { background: "#88888870" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#333333",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={() => { setShowLogoutModal(false); }}
                >
                  CANCEL
                </Button>
              </Box>
            </Box>
          </Box>
        </Box> :
        <></>
      }
      {showInnovationExplanation ?
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
            zIndex: '100',
            '.MuiButton-root': {
              fontFamily: "RobotoSlabFont"
            },
            '.MuiTypography-root': {
              fontFamily: "RobotoSlabFont"
            },
          }
          }
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#1E1E1E',
              borderRadius: '8px',
              border: 'solid 2px #7DF9FF',
              padding: '30px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
              width: { md: '35%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Close
              onClick={(e) => setShowInnovationExplanation(false)}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: '#8f8f8f',
                ':hover': { color: 'white' },
                cursor: 'pointer'
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { md: "24px", xs: "20px" },
                fontWeight: '500',
                color: "#FFFFFF",
              }}
            >
              Innovating Advocacy
            </Typography>
            <Box
              sx={{
                maxHeight: '80vh',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
            <Typography
              sx={{
                // textAlign: "center",
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              Crypto based petitions created with the Quill0x protocol are a groundbreaking fusion of advocacy and blockchain technology. Imagine a decentralized platform where each signature is a unique, immutable blockchain entry, ensuring unparalleled transparency and security. These petitions transcend traditional boundaries, deploying across multiple networks, and uniting like-minded individuals around global causes. They're not just static documents but living entities, evolving through continuous updates with real-time social information reflecting the dynamic nature of movements. Moreover, they empower communities through direct ownership and incentivized participation, using Awareness Tokens that embody the commitment to causes. These tokens are key to capital formation and crucial in amplifying the petition’s communication signal, enhancing its visibility and impact. In essence, crypto petitions are more than advocacy tools; they're self-sustaining ecosystems that blend free speech and ethical investment, transforming how we rally for change in the digital age.
            </Typography>
            <Typography
              sx={{
                // textAlign: "center",
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              Crypto petitions are also a novel means of incentivizing participation in decentralized advocacy. These petitions go beyond just signatures; they're part of a larger ecosystem where both creators and signers are rewarded for their engagement. By emitting rewards that integrate with a broader decentralized advocacy system, crypto petitions ensure that participation is not only impactful but also financially rewarding. Participants, signers, or creators, are incentivized through a system that recognizes and values their contribution to social causes. This fundamentally shifts the dynamics of advocacy, turning every action within the system into a potential source of value. In essence, crypto petitions are transforming advocacy into a rewarding pursuit, where participation in social change is not just a moral choice but a financially beneficial one.
            </Typography>
            </Box>
          </Box>
        </Box > :
        <></>}
    </>
  );
};

export default Navbar;
