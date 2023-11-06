import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Container, Typography, Input } from "@mui/material";
import { Menu, Close, Logout } from "@mui/icons-material";

import queryString from 'query-string';

import { mainnet, goerli, base, baseGoerli } from 'viem/chains';
import { useAccount, useChainId, useConnect, useDisconnect, useEnsName } from 'wagmi';

import axios from 'axios';

const chainLogo = {
  1: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
  5: "https://chainlist.org/unknown-logo.png",
  8453: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  84531: "https://chainlist.org/unknown-logo.png",
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
        border: "1px solid #ffffff",
        borderRadius: "8px",
        ":hover": { background: "#5CD7DD" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        padding: "0px 20px",
        textShadow: "0px 0px 5px #7DF9FF",
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
              textShadow: "0px 0px 5px #7DF9FF",
              letterSpacing: '0px',
            }}
          >{twitterName}</Typography>
        </Box> :
        <Typography
          sx={{
            fontSize: "22px",
            textShadow: "0px 0px 5px #7DF9FF",
            letterSpacing: '0px',
          }}
        >Login</Typography>
      }
    </Button>
  );
}

function ConnectWalletButton({ showMobileMenu, setShowMobileMenu, setShowWalletModal, setShowDisconnectModal }) {

  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const chainId = useChainId();

  const handleClick = () => {
    console.log("Wallet connection clicked");
    setShowMobileMenu(false);
    if (isConnected) {
      setShowDisconnectModal(true);
    } else {
      setShowWalletModal(true);
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
          border: "1px solid #ffffff",
          borderRadius: "8px",
          ":hover": { background: "#5CD7DD" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          padding: "0px 20px",
          textShadow: "0px 0px 5px #7DF9FF",
          letterSpacing: '0px',
        }}
        onClick={() => { handleClick(); }}
      >
        {!isConnected ?
          <Typography
            sx={{
              fontSize: "22px",
              textShadow: "0px 0px 5px #7DF9FF",
              letterSpacing: '0px',
            }}
          >ConnectWallet</Typography> :
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' }
            }}
          >
            <img src={chainLogo[chainId]} alt="chainLogo" />
            <Typography
              sx={{
                fontSize: "22px",
                textShadow: "0px 0px 5px #7DF9FF",
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
        background: "transparent",
        color: "#ffffff",
        fontSize: "22px",
        fontWeight: "400",
        textTransform: "none",
        ":hover": { background: "transparent" },
        display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
        textShadow: "0px 0px 5px #7DF9FF"
      }}
      onClick={(e) => { setShowMobileMenu(false) }}
    >
      Sign Petition
    </Button>
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
          color: "#ffffff",
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
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "0px 0px 5px #7DF9FF"
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
          fontSize: { xs: `${showMobileMenu ? "18px" : "16px"}`, md: "18px" },
          display: { xs: `${showMobileMenu ? 'block' : 'none'}`, md: 'block' },
          fontWeight: "400",
          textTransform: "none",
          ":hover": { background: "transparent" },
          textShadow: "0px 0px 5px #7DF9FF"
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
        flexDirection: "row",
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
        About
      </Button>
      {showSubMenu ?
        <Box
          sx={{
            position: 'absolute',
            top: '40px',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={(e) => { }}
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
            onClick={(e) => { }}
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

  const { disconnect } = useDisconnect()
  const { connect, connectors } =
    useConnect()

  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

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
            paddingRight: { md: '15px!important', xs: '5px!important' },
            paddingLeft: { md: '15px!important', xs: '5px!important' }
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
                gap: '0px',
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
                <span style={{ textShadow: "0px 0px 5px #7DF9FF" }} >
                  P3
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
                {/* <LitepaperButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} /> */}
                <CommunityButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
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
            <AirdropButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
            {/* <LitepaperButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} /> */}
            <CommunityButton showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
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
            zIndex: '100'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#88888850',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              border: 'solid 2px #888888',
              padding: '30px',
              width: { md: '50%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Close onClick={() => { setShowWalletModal(false) }} sx={{ position: 'absolute', top: '20px', right: '20px', color: '#888888', ':hover': { color: '#eeeeee' }, cursor: 'pointer' }} />
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: "28px",
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
                  border: "2px solid #888888",
                  borderRadius: "10px",
                  ":hover": { background: "#00000070" },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: '10px',
                  img: { width: { md: '50px', xs: '30px' }, height: { md: '50px', xs: '30px' }, objectFit: 'contain' }
                }}
                onClick={(e) => { window.open('https://metamask.app.link/dapp/petitions3.com') }}
              >
                <img src="/wallet/mm.png" alt="" />
              </Button>
              <Button
                sx={{
                  width: "30%",
                  background: "#00000030",
                  border: "2px solid #888888",
                  borderRadius: "10px",
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
                  border: "2px solid #888888",
                  borderRadius: "10px",
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
                  border: "2px solid #888888",
                  borderRadius: "10px",
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
                  border: "2px solid #888888",
                  borderRadius: "10px",
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
                  border: "2px solid #888888",
                  borderRadius: "10px",
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
            zIndex: '100'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#333333',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              border: 'solid 2px #888888',
              padding: '30px',
              width: { md: '50%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: { md: "28px", xs: "20px" },
                fontWeight: '500',
                color: "#FFFFFF",
                textAlign: 'center'
              }}
            >
              Are you sure you want to disconnect wallet {ensName ?? address?.substring(0, 4) + "..." + address?.substring(address.length - 4)}?
            </Typography>
            <Box
              sx={{
                width: { md: '50%', xs: '100%' },
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
                    background: "#00000030",
                    border: "2px solid #888888",
                    borderRadius: "10px",
                    ":hover": { background: "#00000070" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#FFFFFF",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={() => { setShowDisconnectModal(false); disconnect() }}
                >
                  Disconnect
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
                    background: "#00000030",
                    border: "2px solid #888888",
                    borderRadius: "10px",
                    ":hover": { background: "#00000070" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#FFFFFF",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={() => { setShowDisconnectModal(false); }}
                >
                  Cancel
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
            zIndex: '100'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              backgroundColor: '#333333',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              border: 'solid 2px #888888',
              padding: '30px',
              width: { md: '50%', xs: '90%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: { md: "28px", xs: "20px" },
                fontWeight: '500',
                color: "#FFFFFF",
                textAlign: 'center'
              }}
            >
              Are you sure you want to log out from Petitions3?
            </Typography>
            <Box
              sx={{
                width: { md: '50%', xs: '100%' },
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
                    background: "#00000030",
                    border: "2px solid #888888",
                    borderRadius: "10px",
                    ":hover": { background: "#00000070" },
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
                  Logout
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
                    background: "#00000030",
                    border: "2px solid #888888",
                    borderRadius: "10px",
                    ":hover": { background: "#00000070" },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingY: '10px',
                    color: "#FFFFFF",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={() => { setShowLogoutModal(false); }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box> :
        <></>
      }
    </>
  );
};

export default Navbar;
