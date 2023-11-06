
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LightX from "../assets/images/social/light-x.png";

import { Box, Typography, Button } from "@mui/material";

import axios from 'axios';

const TwitterLogin = () => {

    const navigate = useNavigate();

    const handleConnectTwitter = () => {
        connect();
    }

    const connect = async () => {
        try {
            const res = await axios.post("https://auth.petitions3.com/api/user/twitter/request");
            console.log("twitter request res:", res);

            window.location.href = new URL(res.data.url.Path + "?" + res.data.url.RawQuery, res.data.url.Scheme + "://" + res.data.url.Host).toString();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                minWidth: '100vw',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '.MuiButton-root': {
                    fontFamily: "RobotoMonoFont"
                },
                '.MuiTypography-root': {
                    fontFamily: "RobotoMonoFont"
                },
            }}
        >
            <Box
                sx={{
                    width: { md: '60%', xs: '90%' },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <img src="./logo192.png" alt="" /> */}
                <Typography
                    sx={{
                        fontSize: { xs: "36px", md: "40px" },
                        color: "#ffffff",
                        fontWeight: "900"
                    }}
                >
                    <span style={{ textShadow: "0px 0px 5px #7DF9FF" }} >
                        Petitions3
                    </span>
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: "16px", md: "20px" },
                        color: "#ffffff",
                        textAlign: 'center'
                    }}
                >
                    <span style={{ textShadow: "0px 0px 5px #7DF9FF" }} >
                        Get rewarded for advocating on X with your friends!
                    </span>
                </Typography>
                <Button
                    sx={{
                        background: "#ffffff",
                        borderRadius: "46px",
                        ":hover": { background: "#ffffff50" },
                        padding: "10px 20px",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textTransform: "none",
                    }}
                    onClick={handleConnectTwitter}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: "#000",
                            letterSpacing: '0px',
                        }}
                    >
                        Login with
                    </Typography>
                    <img width={30} height={30} src={LightX} alt="twitter_link" />
                </Button>
            </Box>
        </Box>
    );
};

export default TwitterLogin;
