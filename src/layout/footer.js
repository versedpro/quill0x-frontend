import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Link } from "@mui/material";

import DarkDocs from "../assets/images/social/dark-docs.svg";
import DarkGithub from "../assets/images/social/dark-github.svg";
import DarkTwitter from "../assets/images/social/dark-twitter.svg";
import LightDocs from "../assets/images/social/light-docs.svg";
import LightGithub from "../assets/images/social/light-github.svg";
import LightTwitter from "../assets/images/social/light-twitter.svg";

const Footer = () => {

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        zIndex: "100",
        '.MuiButton-root': {
          fontFamily: "MontserratFont"
        },
        padding: {md: "0 100px", xs: "0 30px"}
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxWidth: "1600px!important",
          backgroundColor: "#111111",
          padding: {md: "20px 15px", xs: "20px 5px"}
        }}
      >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <Link href="https://docs.google.com/document/d/1udylmArA-t6FbzuwR369Pa9x0SrY452NrlRBEmhDUsk/edit?usp=sharing" underline='none'><Typography
          sx={{
              fontSize: { md: "14px", xs: "12px" },
              color: "#FFFFFF",
          }}
        >
          Privacy Policy
        </Typography></Link>
        <Link href="https://docs.google.com/document/d/1h1WhJfxQOtEo0e5FtL6C1pYrqtrPnryM58F0o2HVf5M/edit?usp=sharing" underline='none'><Typography
          sx={{
              fontSize: { md: "14px", xs: "12px" },
              color: "#FFFFFF",
          }}
        >
          Terms of Service
        </Typography></Link>
        <Link href="mailto:info@cryptopetiions.org" underline='none'><Typography
          sx={{
              fontSize: { md: "14px", xs: "12px" },
              color: "#FFFFFF",
          }}
        >
          Contact Email
        </Typography></Link>
        <Typography
          sx={{
             fontSize: "12px",
              color: "#FFFFFF",
          }}
        >
          CryptoPetitions.org @ Copyright All Rights Reserved 2023
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px'
        }}
      >
      <a href="https://github.com/USDEBT51923">
        <img width={30} height={30} src={DarkGithub} alt="github_link" />
      </a>
      <a href="https://x.com/USDebtCoin">
        <img width={30} height={30} src={DarkTwitter} alt="twitter_link" />
      </a>
      </Box>
      </Container>      
    </Box>
  );
};

export default Footer;
