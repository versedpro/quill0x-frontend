
import { useEffect, useState, useRef } from "react";

import { Box, Container, Typography, Button, TextField, Input } from "@mui/material";

import { useAccount, useEnsName } from 'wagmi';

import PointTable from "../components/point-table";
import MyActivityTable from "../components/myactivity-table";

import axios from 'axios';

const Leaderboard = () => {

    const [twitterName, setTwitterName] = useState('');

    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address })

    const profileRef = useRef();

    const [pointsData, setPointsData] = useState([]);
    const [activityData, setActivityData] = useState([]);

    const [profilePicture, setProfilePicture] = useState("");

    const [selectedTab, setSelectedTab] = useState("leaderboard");

    const fetchProfileData = async () => {
        try {
            let res = await axios.get("https://auth.petitions3.com/api/profile", { params: { address } });
            console.log("profile data res:", res);
            setProfilePicture(res.data.profile.Url);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchActivityData = async (twitterName) => {
        try {
            let res = await axios.get("https://auth.petitions3.com/api/user/activity", { params: { twitterName } });
            console.log("activity data res:", res);

            const userActions = res.data.user_actions.filter((user_action) => user_action.UserID == res.data.user.TwitterID);
            console.log("userActions:", userActions);

            let tmpActivityData = [];
            userActions.map((userAction) => {
                const action = res.data.actions.find((action) => action.ID == userAction.ActionID);

                if (action) {
                    tmpActivityData.push({
                        at: userAction.CreatedAt,
                        action_name: action.Name,
                        points: action.PointsValue
                    });
                }
            })

            setActivityData(tmpActivityData);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchPointData = async () => {
        try {
            let res = await axios.get("https://auth.petitions3.com/api/user");
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

    const handleProfilePicture = async (e) => {
        console.log("handleProfilePicture", e);

        if (e.target.files.length == 0) return;

        const formdata = new FormData();
        formdata.append("file", e.target.files[0]);

        try {
            let res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formdata, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDQxZDBhMy02NzA3LTQ4Y2MtODBjNS1lODM1NTNjNThhMjAiLCJlbWFpbCI6InpvcmFuem92a291c2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjM2YzhmMTI4ZDc4ODVkY2EwZDg0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDM1MjE2Y2Q0ZTRmYjBiOGI1ZDlhMTA4ZDRjNWVlNzM1ZTE3ZmVhODQ0NTUzODA1ZjkxYjljNTk0YzNjMzAzYyIsImlhdCI6MTY4MDM3MDExOX0.A9B7lBRPtITofd3dGBKbXRPbNKYHcXPkyfEjXvp2Qns`,
                }
            });
            console.log("profile ipfs hash:", res.data.IpfsHash);

            res = await axios.post("https://auth.petitions3.com/api/profile", null, { params: { address, url: res.data.IpfsHash } });
            console.log("profile data res:", res);
            setProfilePicture(res.data.profile.Url);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (address) {
            fetchProfileData();
        } else {
            setProfilePicture("");
        }
    }, [address])

    useEffect(() => {

        const twitterName = localStorage.getItem('twitter_name');
        console.log("from storage twitter_name", twitterName);
        if (twitterName) {
            setTwitterName(twitterName);
            fetchActivityData(twitterName);
        }

        fetchPointData();
    }, [])

    return (
        <>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}>
                <Container
                    sx={{
                        maxWidth: "1600px!important",
                        paddingTop: "150px",
                        paddingBottom: "400px",
                        paddingRight: { md: "100px", xs: "20px" },
                        paddingLeft: { md: "100px", xs: "20px" },
                        '.MuiButton-root': {
                            fontFamily: "RobotoMonoFont"
                        },
                        '.MuiTypography-root': {
                            fontFamily: "RobotoMonoFont"
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                padding: '20px',
                                display: 'flex',
                                borderRadius: { md: '20px', xs: '10px' },
                                border: 'solid 1px #333333'
                            }}
                        >
                            <Typography
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    color: '#7DF9FF',
                                    fontSize: { md: '30px', xs: '15px' },
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}
                            >
                                Epoch 2 ends in 29 days.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { md: 'row', xs: 'column' },
                                gap: '20px',
                                paddingBottom: '30px',
                                borderBottom: '1px solid #333333'
                            }}
                        >
                            <Box
                                sx={{
                                    width: { md: '33%', xs: '100%' },
                                    padding: { md: '30px', xs: '20px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: { md: '50px', xs: '30px' },
                                    borderRadius: { md: '20px', xs: '10px' },
                                    border: 'solid 1px #333333'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '40px'
                                    }}
                                >
                                    <input hidden onChange={(e) => { handleProfilePicture(e) }} ref={profileRef} type="file" accept="image/*" multiple={false} />
                                    <Box
                                        onClick={() => { if (address) profileRef.current?.click() }}
                                        sx={{
                                            width: { md: '70px', xs: '50px' },
                                            height: { md: '70px', xs: '50px' },
                                            borderRadius: '100%',
                                            border: 'solid 3px #333333',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            img: { width: '100%', height: '100%', objectFit: 'cover' }
                                        }}
                                    >
                                        {profilePicture ?
                                            <img src={`https://gateway.pinata.cloud/ipfs/${profilePicture}`} alt={address} /> :
                                            <Typography
                                                sx={{
                                                    color: '#7DF9FF',
                                                    fontSize: { md: '50px', xs: '30px' },
                                                    fontWeight: '900'
                                                }}
                                            >
                                                +
                                            </Typography>
                                        }
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: '#7DF9FF',
                                            fontSize: { md: '28px', xs: '20px' },
                                            fontWeight: '700'
                                        }}
                                    >
                                        {ensName ?? address ? address?.substring(0, 6) + "..." + address?.substring(address.length - 4) : ''}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '10px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: '60%',
                                            color: 'white',
                                            fontSize: { md: '20px', xs: '16px' },
                                            fontWeight: '700',
                                            textAlign: 'end'
                                        }}
                                    >
                                        Petitions Signed:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: { md: '20px', xs: '16px' },
                                            fontWeight: '700',
                                            textAlign: 'end'
                                        }}
                                    >
                                        1
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '10px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: '60%',
                                            color: 'white',
                                            fontSize: { md: '20px', xs: '16px' },
                                            fontWeight: '700',
                                            textAlign: 'end'
                                        }}
                                    >
                                        Referrals:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: { md: '20px', xs: '16px' },
                                            fontWeight: '700',
                                            textAlign: 'end'
                                        }}
                                    >
                                        10
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { md: '67%', xs: '100%' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}
                            >
                                <Box
                                    sx={{
                                        padding: { md: '30px', xs: '20px' },
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        borderRadius: { md: '20px', xs: '10px' },
                                        border: 'solid 1px #333333'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { md: '130px', xs: '50px' },
                                            height: { md: '130px', xs: '50px' },
                                            padding: { md: '20px', xs: '5px' },
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333',
                                            img: { width: '100%', height: '100%' }
                                        }}
                                    >
                                        <img src="/logo192.png" alt="uncleSam" />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { md: '130px', xs: '50px' },
                                            height: { md: '130px', xs: '50px' },
                                            padding: { md: '20px', xs: '5px' },
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333',
                                            img: { width: '100%', height: '100%' }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                color: '#7DF9FF',
                                                fontSize: { md: '100px', xs: '30px' },
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                lineHeight: { md: '80px', xs: '40px' }
                                            }}
                                        >
                                            2
                                        </Typography>
                                        {/* <img src="/logo192.png" alt="uncleSam" /> */}
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { md: '130px', xs: '50px' },
                                            height: { md: '130px', xs: '50px' },
                                            padding: { md: '20px', xs: '5px' },
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333',
                                            img: { width: '100%', height: '100%' }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                color: '#7DF9FF30',
                                                fontSize: { md: '100px', xs: '30px' },
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                lineHeight: { md: '80px', xs: '40px' }
                                            }}
                                        >
                                            3
                                        </Typography>
                                        {/* <img src="/logo192.png" alt="uncleSam" /> */}
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { md: '130px', xs: '50px' },
                                            height: { md: '130px', xs: '50px' },
                                            padding: { md: '20px', xs: '5px' },
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333',
                                            img: { width: '100%', height: '100%' }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                color: '#7DF9FF30',
                                                fontSize: { md: '100px', xs: '30px' },
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                lineHeight: { md: '80px', xs: '40px' }
                                            }}
                                        >
                                            4
                                        </Typography>
                                        {/* <img src="/logo192.png" alt="uncleSam" /> */}
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { md: '130px', xs: '50px' },
                                            height: { md: '130px', xs: '50px' },
                                            padding: { md: '20px', xs: '5px' },
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333',
                                            img: { width: '100%', height: '100%' }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                color: '#7DF9FF30',
                                                fontSize: { md: '100px', xs: '30px' },
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                lineHeight: { md: '80px', xs: '40px' }
                                            }}
                                        >
                                            5
                                        </Typography>
                                        {/* <img src="/logo192.png" alt="uncleSam" /> */}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { md: 'row', xs: 'column' },
                                        gap: '20px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: { md: '50%', xs: '100%' },
                                            padding: { md: '30px', xs: '20px' },
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '-10px',
                                                left: 0,
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    backgroundColor: '#000',
                                                    padding: '0 10px',
                                                    color: 'white',
                                                    fontSize: { md: '20px', xs: '16px' },
                                                    fontWeight: '500',
                                                    textAlign: 'center',
                                                    lineHeight: '20px'
                                                }}
                                            >
                                                Points Earned
                                            </Typography>
                                        </Box>
                                        <Typography
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                color: '#7DF9FF',
                                                fontSize: { md: '80px', xs: '50px' },
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                lineHeight: '80px'
                                            }}
                                        >
                                            10,000
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: { md: '50%', xs: '100%' },
                                            padding: { md: '30px', xs: '20px' },
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderRadius: { md: '20px', xs: '10px' },
                                            border: 'solid 1px #333333'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '-10px',
                                                left: 0,
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    backgroundColor: '#000',
                                                    padding: '0 10px',
                                                    color: 'white',
                                                    fontSize: { md: '20px', xs: '16px' },
                                                    fontWeight: '500',
                                                    textAlign: 'center',
                                                    lineHeight: '20px'
                                                }}
                                            >
                                                Awareness Token #2 Earned
                                            </Typography>
                                        </Box>
                                        <Typography
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                color: '#7DF9FF',
                                                fontSize: { md: '80px', xs: '50px' },
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                lineHeight: '80px'
                                            }}
                                        >
                                            0
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '50px'
                        }}
                    >
                        <Box
                            sx={{
                                marginTop: "30px",
                                borderBottom: "solid 1px #333333",
                                display: 'flex',
                                flexDirection: 'row',
                                gap: "20px",
                                px: "20px"
                            }}
                        >
                            <Button
                                onClick={(e) => setSelectedTab("leaderboard")}
                                sx={{
                                    height: '40px',
                                    background: 'transparent',
                                    color: `${selectedTab == "leaderboard" ? "#ffffff" : "#FFFFFF"}`,
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px",
                                    fontSize: { md: "20px", xs: '16px' },
                                    fontWeight: '500',
                                    padding: { md: "5px 20px", xs: '5px' },
                                    textShadow: `${selectedTab == "leaderboard" ? "0px 0px 5px #7DF9FF" : ""}`
                                }}
                            >
                                Leaderboard
                            </Button>
                            <Button
                                onClick={(e) => setSelectedTab("my_activity")}
                                sx={{
                                    height: '40px',
                                    background: 'transparent',
                                    color: `${selectedTab == "my_activity" ? "#ffffff" : "#FFFFFF"}`,
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px",
                                    fontSize: { md: "20px", xs: '16px' },
                                    fontWeight: '500',
                                    padding: { md: "5px 20px", xs: '5px' },
                                    textShadow: `${selectedTab == "my_activity" ? "0px 0px 5px #7DF9FF" : ""}`
                                }}
                            >
                                My Activity
                            </Button>
                        </Box>
                        {selectedTab == "leaderboard" ?
                            <Box
                                sx={{
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
                            </Box> :
                            <Box
                                sx={{
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
                                    My Activity
                                </Typography>
                                <MyActivityTable
                                    tableItems={activityData}
                                />
                            </Box>
                        }
                    </Box>
                </Container>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        img: { width: '100%', height: '100%', objectFit: 'contain', opacity: '10%' }
                    }}
                >
                    <img src="/airdrop.svg" alt="airdrop_bg" />
                </Box>
            </Box>
        </>
    );
};
export default Leaderboard;
