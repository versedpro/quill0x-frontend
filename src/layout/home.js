
import { useEffect, useState } from "react";

import BannerVideo from "../assets/default-banner.mp4";
import SignerTable from "../components/signer-table";
import { Box, Container, Typography, Button } from "@mui/material";

const Home = () => {

    const CAGR = 0.096;
    const initialDebt = 30928910000000;
    const perSecondGrowthRate = Math.pow(1 + CAGR, 1 / (365 * 24 * 60 * 60)) - 1;

    const [DebtClock, setDebtClock] = useState('');

    const numberWithCommas = (x) => {
        return new Intl.NumberFormat().format(x);
    }

    const updateDebtClock = () => {
        const currentTime = new Date();
        const startOf2023 = new Date('2023-01-01T00:00:00');
        const secondsSince2023 = (currentTime - startOf2023) / 1000;
        const currentDebt = initialDebt * Math.pow(1 + perSecondGrowthRate, secondsSince2023);
        setDebtClock(`$${numberWithCommas(currentDebt.toFixed(0))}`);
        // document.getElementById('debtClock').innerText = `$${numberWithCommas(currentDebt.toFixed(0))}`;
    }

    useEffect(() => {
        setInterval(() => {
            updateDebtClock();
          }, 100);
    }, [])

    return (
        <Container
            sx={{
                maxWidth: "1600px!important",
                paddingTop: "80px",
                paddingBottom: "50px",
                paddingRight: { md: "100px", xs: "30px" },
                paddingLeft: { md: "100px", xs: "30px" },
                '.MuiTypography-root': {
                    fontFamily: "UsdebtFont"
                },
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
            }}
        >
            <Box
                sx={{
                    marginTop: "20px",
                    video: {
                        width: "100%",
                    },
                }}
            >
                <video src={BannerVideo} loop autoPlay controls />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: { xs: 'start', md: 'space-between' },
                        gap: '50px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { md: '48%', xs: '100%' },
                            gap: '10px'
                        }}
                    >
                        <Box
                            sx={{
                                marginTop: "16px",
                                display: 'flex',
                                flexDirection: { md: 'row', xs: 'column' },
                                alignItems: { md: 'center', xs: 'start' },
                            }}
                        >
                            <Box
                                sx={{
                                    ".MuiTypography-root": {
                                        fontSize: { md: "38px", xs: "36px" },
                                        color: "white",
                                        fontWeight: "500",
                                        lineHeight: { md: "52px", xs: "40px" },
                                    },
                                }}
                            >
                                <Typography>DECENTRALIZATION</Typography>
                                <Typography>AGAINST RISING  U.S.NATIONAL DEBT</Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px'
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "justify",
                                    fontSize: { md: "20px", xs: "16px" },
                                    fontWeight: "100",
                                    color: "#FFFFFF",
                                }}
                            >
                                <i>
                                    AN OPEN LETTER AND PETITION FROM THE USDEBT COMMUNITY
                                </i>
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "justify",
                                    fontSize: { md: "20px", xs: "16px" },
                                    color: "#FFFFFF",
                                }}
                            >
                                Dear Members of the United States Congress,
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "justify",
                                    fontSize: { md: "20px", xs: "16px" },
                                    lineHeight: { md: '40px', xs: '32px' },
                                    color: "#FFFFFF",
                                }}
                            >
                                Alexander Hamilton astutely noted, "A national debt, if it is not excessive, will be to us a national blessing." Sadly, our national debt has surged dramatically in recent years and currently stands at {DebtClock}.
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "justify",
                                    fontSize: { md: "20px", xs: "16px" },
                                    lineHeight: { md: '40px', xs: '32px' },
                                    color: "#FFFFFF",
                                }}
                            >
                                As a glaring indicator of our nation's fiscal health, in August 2023, the US credit rating was downgraded from the gold standard AAA to AA++. Furthermore, by October 2023, our interest payments surpassed even our defense budget, underscoring the severe financial strain we face. Such critical circumstances warrant your immediate and undivided attention.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: '50px'
                            }}
                        >
                            <Button
                                sx={{
                                    background: "#ba0d0d",
                                    color: "#FFFFFF",
                                    fontSize: "22px",
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    padding: "5px 30px",
                                    boxShadow: 3,
                                    ":hover": { background: "#D32F28" }
                                }}
                            >
                                <b>
                                    Sign Petition
                                </b>
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: { md: '150px', xs: '50px' },
                            paddingTop: '50px',
                            paddingBottom: '70px',
                            width: { md: '48%', xs: '100%' }
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "justify",
                                    fontSize: { md: "24px", xs: "20px" },
                                    fontWeight: '500',
                                    color: "#FFFFFF",
                                }}
                            >
                                Number of Signers
                            </Typography>
                            <Typography
                                sx={{
                                    textShadow: "2px 0px 1px rgba(150, 150, 150, 0.9)",
                                    textAlign: "justify",
                                    fontSize: { md: "42px", xs: "38px" },
                                    fontWeight: '700',
                                    color: "#FFFFFF",
                                }}
                            >
                                125
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "justify",
                                    fontSize: { md: "24px", xs: "20px" },
                                    fontWeight: '500',
                                    color: "#FFFFFF",
                                }}
                            >
                                USDEBT Held
                            </Typography>
                            <Typography
                                sx={{
                                    textShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)",
                                    textAlign: "justify",
                                    fontSize: { md: "42px", xs: "38px" },
                                    fontWeight: '700',
                                    color: "#FFFFFF",
                                }}
                            >
                                $325K
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: { md: "100px", xs: "30px" },
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            The aftermath of the 2008 Great Financial Crisis unmasked significant vulnerabilities in our global financial systems. These events, coupled with subsequent economic policies, have accelerated us into the perilous position of unsustainable debt levels. Such conditions inevitably lead to high inflation and the devaluation of our currency, eroding the purchasing power of everyday Americans.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            The mounting US national debt affects every aspect of American life: higher potential taxes, decreased public services, and dimmed economic opportunities for upcoming generations. Increasing costs and surging interest payments endanger crucial investments in infrastructure, education, and healthcare. Beyond stalling our economy, this widens the wealth gap and hinders effective job creation.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            Internationally, the ballooning US national debt creates unease. If foreign holders of US debt start questioning our repayment capacities, the fallout could be devastating: decreased foreign investments and a tarnished American financial reputation. Should we persist down this road, we court a financial crisis that might surpass the 2008 recession. Our nation's current fiscal stability places us in a vulnerable situation.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            However, in the backdrop of these fiscal challenges, cryptocurrencies like Bitcoin are flourishing, representing a paradigm shift in global perspectives on value, trust, and financial independence. Their rising acceptance isn't a fleeting phase. It's a worldwide acknowledgment that if traditional economic safeguards falter, alternatives exist.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            Introducing the USDEBT token. Symbolizing the national debt, this token serves as a poignant reminder and an amplification of awarness. Every holder acknowledges our pressing fiscal situation while also signaling optimism in the innovative solutions the cryptocurrency domain proposes.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            We, the undersigned, demand the United States Congress to respond with urgency. The fiscal landscape is evolving, and our strategies must adapt accordingly. We urge you to confront this significant challenge—for our era and the ones to come.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { md: "-50px", xs: "20px" },
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start'
                        }}
                    >
                        <Typography
                            sx={{
                                width: { md: "48%", xs: "100%" },
                                textAlign: "justify",
                                fontSize: { md: "20px", xs: "16px" },
                                lineHeight: { md: '40px', xs: '32px' },
                                color: "#FFFFFF",
                            }}
                        >
                            The world observes, innovates, and anticipates. Will our leadership meet the moment?
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <SignerTable
                tableItems={[
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    },
                    {
                        signerAddress: "0x42b9641c96865C70A8a29d6889CdB0b3E6D6E64d",
                        usdebtBalance: 2536577889,
                        ethBalance: 26.5,
                    }
                ]}
            />
        </Container >
    );
};
export default Home;
