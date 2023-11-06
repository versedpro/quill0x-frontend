import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Link } from "@mui/material";

import DarkDocs from "../assets/images/social/dark-docs.svg";
import DarkGithub from "../assets/images/social/dark-github.svg";
import DarkX from "../assets/images/social/dark-x.png";
import LightDocs from "../assets/images/social/light-docs.svg";
import LightGithub from "../assets/images/social/light-github.svg";
import LightTwitter from "../assets/images/social/light-twitter.svg";

const Footer = () => {

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        zIndex: "100",
        '.MuiButton-root': {
          fontFamily: "RobotoMonoFont"
        },
        '.MuiTypography-root': {
          fontFamily: "RobotoMonoFont"
        }
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: "1600px!important",
          background: "#33333310",
          backdropFilter: 'blur(10px)',
          padding: "30px 15px",
          gap: '20px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '40px',
            img: { width: { md: '30px', xs: '20px' }, height: { md: '30px', xs: '20px' } }
          }}
        >
          <a href="https://github.com/petitions3">
            <img src={DarkGithub} alt="github_link" />
          </a>
          <a href="https://x.com/petitions3_">
            <img src={DarkX} alt="twitter_link" />
          </a>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: { md: 'none', xs: 'flex' },
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Link href="https://docs.google.com/document/d/1udylmArA-t6FbzuwR369Pa9x0SrY452NrlRBEmhDUsk/edit?usp=sharing" underline='none'><Typography
            sx={{
              fontSize: "12px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Privacy
          </Typography></Link>
          <Link href="https://docs.google.com/document/d/1h1WhJfxQOtEo0e5FtL6C1pYrqtrPnryM58F0o2HVf5M/edit?usp=sharing" underline='none'><Typography
            sx={{
              fontSize: "12px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Terms Service
          </Typography></Link>
          <Link href="mailto:info@cryptopetiions.org" underline='none'><Typography
            sx={{
              fontSize: "12px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Contact
          </Typography></Link>
          <Link href="#" underline='none'><Typography
            sx={{
              fontSize: "12px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Litepaper
          </Typography></Link>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: { md: 'flex', xs: 'none' },
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '150px'
          }}
        >
          <Link href="https://docs.google.com/document/d/1udylmArA-t6FbzuwR369Pa9x0SrY452NrlRBEmhDUsk/edit?usp=sharing" underline='none'><Typography
            sx={{
              fontSize: "14px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Privacy Policy
          </Typography></Link>
          <Link href="https://docs.google.com/document/d/1h1WhJfxQOtEo0e5FtL6C1pYrqtrPnryM58F0o2HVf5M/edit?usp=sharing" underline='none'><Typography
            sx={{
              fontSize: "14px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Terms of Service
          </Typography></Link>
          <Link href="mailto:info@cryptopetiions.org" underline='none'><Typography
            sx={{
              fontSize: "14px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Contact Us
          </Typography></Link>
          <Link href="#" underline='none'><Typography
            sx={{
              fontSize: "14px",
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            Litepaper
          </Typography></Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <Typography
            sx={{
              fontSize: { md: "12px", xs: '8px' },
              color: "#FFFFFF",
              textAlign: 'center'
            }}
          >
            CryptoPetitions.org @ Copyright All Rights Reserved 2023
          </Typography>
          {/* <Typography
              sx={{
                fontSize: "12px",
                color: "#FFFFFF",
                textAlign: 'center'
              }}
            >
              @ Copyright All Rights Reserved 2023
            </Typography> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
