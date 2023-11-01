
import { useEffect, useState } from "react";

import { Box, Container, Typography, Button, TextField } from "@mui/material";

import PointTable from "../components/point-table";

import axios from 'axios';

const Leaderboard = () => {

    const [pointsData, setPointsData] = useState([]);

    const getUserData = async () => {
        try {
            const res = await axios.get("https://auth.petitions3.com/api/user");
            console.log("user data res:", res);

            let tmpPointsData = [];
            res.data.users.map((user) => {
                tmpPointsData.push({ twitter_name: user.TwitterName, total_points: user.TotalPoints, referred_points: user.ReferredPoints });
            })
            console.log("points data:", tmpPointsData);
            setPointsData(tmpPointsData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100%'
            }}>
                <Container
                    sx={{
                        maxWidth: "1600px!important",
                        paddingTop: "80px",
                        paddingBottom: "400px",
                        paddingRight: { md: "100px", xs: "30px" },
                        paddingLeft: { md: "100px", xs: "30px" },
                        '.MuiButton-root': {
                            fontFamily: "RobotoMonoFont"
                        },
                        '.MuiTypography-root': {
                            fontFamily: "RobotoMonoFont"
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '50px'
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "100px",
                            paddingBottom: "100px",
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '50px'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontSize: { md: '40px', xs: '32px' },
                                fontWeight: '900',
                                textAlign: 'center'
                            }}
                        >
                            Leaderboard
                        </Typography>
                        <PointTable
                            tableItems={pointsData}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
};
export default Leaderboard;
