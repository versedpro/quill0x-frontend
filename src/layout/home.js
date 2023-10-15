
import { useEffect, useState } from "react";

import BannerVideo from "../assets/default-banner.mp4";
import SignerTable from "../components/signer-table";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link, Close, AccountCircle } from "@mui/icons-material";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'next-share';

import { useMetaMask } from "metamask-react";
import { petition_abi } from "../petition_abi";
import { token_abi } from "../token_abi";
import Web3, { utils } from 'web3';
const web3 = new Web3(window.ethereum);
// const petitionAddress = '0xe44c1915C6E537745A6a0Dd23AdDFA62649e59d0';
const petitionAddress = '0x228bc24aa08e37f6D45C6d4590fd9B5162dCD0a1';
const tokenAddress = '0xdDA06BCe0E209825F741F0B7049e837493D41f2B';

const Home = () => {

    const CAGR = 0.1095;
    const initialDebt = 30928910000000;
    const perSecondGrowthRate = Math.pow(1 + CAGR, 1 / (365 * 24 * 60 * 60)) - 1;

    const [DebtClock, setDebtClock] = useState('');
    const [DebtClockOptimized, setDebtClockOptimized] = useState('');
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [readMore, setReadMore] = useState(false);

    const { account } = useMetaMask();

    const petitionContract = new web3.eth.Contract(petition_abi, petitionAddress);
    const tokenContract = new web3.eth.Contract(token_abi, tokenAddress);

    const [isSigned, setIsSigned] = useState(null);

    const [petitionTitle, setPetitionTitle] = useState("");
    const [petitionSubtitle, setPetitionSubtitle] = useState("");
    const [petitionStarted, setPetitionStarted] = useState("");
    const [petitionTo, setPetitionTo] = useState([]);
    const [petitionDescription, setPetitionDescription] = useState([]);

    const [showPetitionToDialog, setShowPetitionToDialog] = useState(false);

    const [ethSignersInfo, setEthSignersInfo] = useState([]);
    const [usdebtSignersInfo, setUsdebtSignersInfo] = useState([]);
    const [totalUsdebt, setTotalUsdebt] = useState('0.0K');

    const numberWithCommas = (x) => {
        return new Intl.NumberFormat().format(x);
    }

    const updateDebtClock = () => {
        const currentTime = new Date();
        const startOf2023 = new Date('2023-01-01T00:00:00');
        const secondsSince2023 = (currentTime - startOf2023) / 1000;
        const currentDebt = initialDebt * Math.pow(1 + perSecondGrowthRate, secondsSince2023);
        setDebtClock(`$${numberWithCommas(currentDebt.toFixed(0))}`);
        setDebtClockOptimized(`${(currentDebt / 1000000000000).toFixed(1)}`);
        // document.getElementById('debtClock').innerText = `$${numberWithCommas(currentDebt.toFixed(0))}`;
    }

    const onSignPetition = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const message = "By proceeding, you're cryptographically signing the USDEBT petition using your unique digital signature. Rest assured, this action does not involve transferring any tokens or funds from your wallet. It's simply a way to show your support using the security of blockchain technology. Your signature is important, and we thank you for making your voice heard!\n\nProceed with confidence!";
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [web3.utils.utf8ToHex(message), account],
            });
            console.log(`Signature: ${signature}`);

            const encodeABI = petitionContract.methods.signPetition().encodeABI();
            const txParams = {
                from: account, // Replace with your actual sender address
                to: petitionAddress,
                value: web3.utils.toWei('0.01', 'ether'),
                data: encodeABI
            };
            const receipt = await web3.eth.sendTransaction(txParams);
            console.log('Transaction receipt:', receipt);
            fetchContractData(account);
        } catch (error) {
            console.error('Error:', error);
        };
    }

    const fetchContractData = async (account) => {
        if (account != null) {
            try {
                const is_signed = await petitionContract.methods.isSigned(account).call();
                console.log("is_signed", is_signed);
                setIsSigned(is_signed);

                const petition_info = await petitionContract.methods.getPetition().call();
                console.log("petition_info", petition_info, petition_info[0], petition_info[1], petition_info[2].split("  "));

                setPetitionTitle(petition_info[0]);
                setPetitionSubtitle(petition_info[1]);
                setPetitionStarted(petition_info[2]);
                let tmpPetitionTo = [];
                petition_info[3].split("), ").map((item) => {
                    tmpPetitionTo.push(item);
                })
                setPetitionTo(tmpPetitionTo);
                setPetitionDescription(petition_info[4].split("  "));

                let total_usdebt = 0;
                let tmpSignersInfo = [];
                for (let i = 0; i < petition_info[6].length; i++) {
                    const eth_balance = await web3.eth.getBalance(petition_info[6][i]);
                    const token_balance = await tokenContract.methods.balanceOf(petition_info[6][i]).call();
                    total_usdebt += Number(web3.utils.fromWei(token_balance, 'ether'));
                    tmpSignersInfo.push({
                        signerAddress: petition_info[6][i],
                        usdebtBalance: Number(web3.utils.fromWei(token_balance, 'ether')).toFixed(2),
                        ethBalance: Number(web3.utils.fromWei(eth_balance, 'ether')).toFixed(2)
                    });
                }
                setUsdebtSignersInfo(tmpSignersInfo);

                tmpSignersInfo = [];
                for (let i = 0; i < petition_info[7].length; i++) {
                    const eth_balance = await web3.eth.getBalance(petition_info[7][i]);
                    const token_balance = await tokenContract.methods.balanceOf(petition_info[7][i]).call();
                    total_usdebt += Number(web3.utils.fromWei(token_balance, 'ether'));
                    tmpSignersInfo.push({
                        signerAddress: petition_info[7][i],
                        usdebtBalance: Number(web3.utils.fromWei(token_balance, 'ether')).toFixed(2),
                        ethBalance: Number(web3.utils.fromWei(eth_balance, 'ether')).toFixed(2)
                    });
                }
                setEthSignersInfo(tmpSignersInfo);

                if (total_usdebt / 1000000000000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000000000000).toFixed(1)}T`);
                } else if (total_usdebt / 1000000000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000000000).toFixed(1)}M`);
                } else if (total_usdebt / 1000000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000000).toFixed(1)}B`);
                } else if (total_usdebt / 1000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000).toFixed(1)}K`);
                } else {
                    setTotalUsdebt(`${(total_usdebt).toFixed(1)}`);
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    }

    useEffect(() => {
        fetchContractData(account);
    }, [account]);

    useEffect(() => {
        setInterval(() => {
            updateDebtClock();
        }, 100);
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
                        paddingBottom: "50px",
                        paddingRight: { md: "100px", xs: "30px" },
                        paddingLeft: { md: "100px", xs: "30px" },
                        '.MuiTypography-root': {
                            fontFamily: "MontserratFont"
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '50px'
                    }}
                >
                    <Box
                        sx={{
                            video: {
                                width: "100%",
                                border: "0.6px solid grey",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: '1px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ba0d0d',
                                        fontSize: { md: '60px', xs: '40px' },
                                        fontWeight: '900',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    US
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: { md: '60px', xs: '40px' },
                                        fontWeight: '900',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    DE
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#314E85',
                                        fontSize: { md: '60px', xs: '40px' },
                                        fontWeight: '900',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    BT
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: { md: '50px', xs: '32px' },
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    lineHeight: '1.2'
                                }}
                            >
                                <b>A DECENTRALIZED PETITION<br />AGAINST</b>
                            </Typography>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '5px',
                                        backgroundColor: "#ba0d0d"
                                    }}
                                ></Box>
                                <Typography
                                    sx={{
                                        color: '#ba0d0d',
                                        fontSize: { md: '50px', xs: '32px' },
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    EXCESSIVE
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '5px',
                                        backgroundColor: "#ba0d0d"
                                    }}
                                ></Box>
                            </Box>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: { md: '50px', xs: '32px' },
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    i: { color: "white" },
                                    lineHeight: '1.2'
                                }}
                            >
                                <b>U.S. NATIONAL DEBT</b>
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: { md: '45px', xs: '32px' },
                                textAlign: 'center',
                                textShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)",
                                fontFamily: 'sans-serif!important',
                                lineHeight: '45px',
                                paddingBottom: '50px'
                            }}
                        >
                            {DebtClock}
                        </Typography>
                        <video src={BannerVideo} loop autoPlay controls />
                        <Box
                            sx={{
                                display: { md: 'none', xs: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'start',
                                alignItems: 'center',
                                paddingTop: '50px',
                                gap: '50px'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex'
                                }}
                            >
                                <Button
                                    onClick={(e) => { onSignPetition() }}
                                    sx={{
                                        height: '80px',
                                        width: '100%',
                                        background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        color: "#FFFFFF",
                                        fontSize: "27px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "80px",
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#314E85" },
                                        ":disabled": { color: "#ffffff70", background: "#314E8570" }
                                    }}
                                    disabled={isSigned}
                                >
                                    {isSigned ? "Petition Signed" : "Sign Petition"}
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    backgroundColor: "#111111",
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    borderRadius: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: { md: "28px", xs: "24px" },
                                        fontWeight: '500',
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Number of<br />Signers
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: "justify",
                                        fontSize: { md: "72px", xs: "68px" },
                                        fontWeight: '700',
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {ethSignersInfo.length + usdebtSignersInfo.length}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex'
                                }}
                            >
                                <Button
                                    onClick={(e) => { console.log(showShareDialog); setShowShareDialog(true) }}
                                    sx={{
                                        height: '80px',
                                        width: '100%',
                                        background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        color: "#FFFFFF",
                                        fontSize: "27px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "80px",
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#314E85" }
                                    }}
                                >
                                    Share Petition
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    backgroundColor: "#111111",
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    borderRadius: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontSize: { md: "28px", xs: "24px" },
                                        fontWeight: '500',
                                        color: "#FFFFFF",
                                    }}
                                >
                                    USDEBT Held<br />by Signers
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: "justify",
                                        fontSize: { md: "72px", xs: "68px" },
                                        fontWeight: '700',
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {totalUsdebt}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { md: 'flex', xs: 'none' },
                                flexDirection: { md: 'row', xs: 'column' },
                                justifyContent: { md: 'center', xs: 'start' },
                                alignItems: { md: 'end', xs: 'center' },
                                paddingTop: '50px',
                                gap: { lg: '100px', xs: '50px' }
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '50px'
                                }}
                            >
                                <Button
                                    onClick={(e) => { onSignPetition() }}
                                    sx={{
                                        height: '80px',
                                        width: '340px',
                                        background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        color: "#FFFFFF",
                                        fontSize: "27px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "80px",
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#314E85" },
                                        ":disabled": { color: "#ffffff70", background: "#314E8570" }
                                    }}
                                    disabled={isSigned}
                                >
                                    {isSigned ? "Petition Signed" : "Sign Petition"}
                                </Button>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '10px',
                                        backgroundColor: "#111111",
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                            fontSize: { md: "28px", xs: "24px" },
                                            fontWeight: '500',
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        Number of<br />Signers
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textAlign: "justify",
                                            fontSize: { md: "72px", xs: "68px" },
                                            fontWeight: '700',
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {ethSignersInfo.length + usdebtSignersInfo.length}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '50px'
                                }}
                            >
                                <Button
                                    onClick={(e) => { console.log(showShareDialog); setShowShareDialog(true) }}
                                    sx={{
                                        height: '80px',
                                        width: '340px',
                                        background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        color: "#FFFFFF",
                                        fontSize: "27px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "80px",
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#314E85" }
                                    }}
                                >
                                    Share Petition
                                </Button>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '10px',
                                        backgroundColor: "#111111",
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                            fontSize: { md: "28px", xs: "24px" },
                                            fontWeight: '500',
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        USDEBT Held<br />by Signers
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textAlign: "justify",
                                            fontSize: { md: "72px", xs: "68px" },
                                            fontWeight: '700',
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {totalUsdebt}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: "30px" },
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: "#111111",
                                padding: '20px',
                                borderRadius: '10px'
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: { xs: "20px" },
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography
                                    sx={{
                                        width: { xs: "100%" },
                                        fontSize: { md: "22px", xs: "18px" },
                                        fontWeight: '700',
                                        lineHeight: { md: '40px', xs: '32px' },
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {petitionTitle}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: { xs: "20px" },
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start'
                                }}
                            >
                                <Typography
                                    sx={{
                                        width: { xs: "100%" },
                                        textAlign: "justify",
                                        fontSize: { md: "22px", xs: "16px" },
                                        lineHeight: { md: '40px', xs: '32px' },
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {petitionSubtitle}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: '20px',
                                    marginBottom: '40px',
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDiretion: 'row',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { md: '20%', xs: '40%' },
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'start'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: { xs: "100%" },
                                                textAlign: "justify",
                                                fontSize: { md: "20px", xs: "14px" },
                                                lineHeight: { md: '40px', xs: '32px' },
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            Started
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { md: '80%', xs: '60%' },
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'start'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: { xs: "100%" },
                                                textAlign: "justify",
                                                fontSize: { md: "20px", xs: "14px" },
                                                lineHeight: { md: '40px', xs: '32px' },
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {petitionStarted}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDiretion: 'row',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { md: '20%', xs: '40%' },
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'start'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                width: { xs: "100%" },
                                                textAlign: "justify",
                                                fontSize: { md: "20px", xs: "14px" },
                                                lineHeight: { md: '40px', xs: '32px' },
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            Petition to
                                        </Typography>
                                    </Box>
                                    {petitionTo.length != 0 ?
                                        <Box
                                            sx={{
                                                width: { md: '80%', xs: '60%' },
                                                display: 'flex'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    textAlign: "justify",
                                                    fontSize: { md: "20px", xs: "14px" },
                                                    lineHeight: { md: '40px', xs: '32px' },
                                                    color: "#FFFFFF"
                                                }}
                                            >
                                                {petitionTo[0].split(" (")[0]} and <u onClick={() => { setShowPetitionToDialog(true) }}>{petitionTo.length - 1} others</u>
                                            </Typography>
                                        </Box> :
                                        <></>
                                    }
                                </Box>
                            </Box>
                            {petitionDescription.map((description, index) => {
                                if (index < 3) {
                                    return (
                                        <Box
                                            sx={{
                                                marginTop: { xs: "20px" },
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'start'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    width: { xs: "100%" },
                                                    textAlign: "justify",
                                                    fontSize: { md: "20px", xs: "14px" },
                                                    lineHeight: { md: '40px', xs: '32px' },
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {description}
                                            </Typography>
                                        </Box>
                                    )
                                }
                            })}
                            {petitionDescription.length > 3 && (readMore ?
                                <>
                                    {petitionDescription.map((description, index) => {
                                        if (index >= 3) {
                                            return (
                                                <Box
                                                    sx={{
                                                        marginTop: { xs: "20px" },
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'start'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            width: { xs: "100%" },
                                                            textAlign: "justify",
                                                            fontSize: { md: "20px", xs: "14px" },
                                                            lineHeight: { md: '40px', xs: '32px' },
                                                            color: "#FFFFFF",
                                                        }}
                                                    >
                                                        {description}
                                                    </Typography>
                                                </Box>
                                            )
                                        }
                                    })}
                                    <Box
                                        sx={{
                                            paddingTop: '50px',
                                            display: 'flex',
                                            justifyContent: 'start',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                color: "#FFFFFF",
                                                fontSize: "22px",
                                                textTransform: "none",
                                                fontWeight: "400",
                                                padding: "1px 20px",
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => { setReadMore(false) }}
                                        >
                                            {`Show Less <<`}
                                        </Box>
                                    </Box>
                                </> :
                                <Box
                                    sx={{
                                        paddingTop: '50px',
                                        display: 'flex',
                                        justifyContent: 'start',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: "#FFFFFF",
                                            fontSize: "22px",
                                            textTransform: "none",
                                            fontWeight: "400",
                                            padding: "1px 20px",
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => { setReadMore(true) }}
                                    >
                                        {`Show More >>`}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { md: 'row', xs: 'column' },
                                justifyContent: { md: 'center', xs: 'start' },
                                alignItems: { md: 'end', xs: 'center' },
                                paddingTop: '50px',
                                gap: { md: '200px', xs: '50px' }
                            }}
                        >
                            <Box
                                sx={{
                                    width: { md: 'auto', xs: '100%' },
                                    display: 'flex'
                                }}
                            >
                                <Button
                                    onClick={(e) => { onSignPetition() }}
                                    sx={{
                                        height: '80px',
                                        width: { md: '340px', xs: '100%' },
                                        background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        color: "#FFFFFF",
                                        fontSize: "27px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "80px",
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#314E85" },
                                        ":disabled": { color: "#ffffff70", background: "#314E8570" }
                                    }}
                                    disabled={isSigned}
                                >
                                    {isSigned ? "Petition Signed" : "Sign Petition"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <SignerTable
                        tableItems={usdebtSignersInfo}
                        isUsdebtSigners={true}
                    />
                    <SignerTable
                        tableItems={ethSignersInfo}
                        isUsdebtSigners={false}
                    />
                </Container >
            </Box>
            {showShareDialog ?
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
                        <Close
                            onClick={(e) => setShowShareDialog(false)}
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
                                textAlign: "justify",
                                fontSize: "28px",
                                fontWeight: '500',
                                color: "#FFFFFF",
                            }}
                        >
                            Share your petition
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "justify",
                                fontSize: "16px",
                                color: "#FFFFFF",
                            }}
                        >
                            Spread awareness on the U. S. National Crisis by sharing the petition in as many places as possible.
                        </Typography>
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
                            onClick={(e) => { }}
                        >
                            <Link />
                            <b>Copy link</b>
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box
                                sx={{
                                    width: "32%",
                                    background: "#8f8f8f",
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    textTransform: "none",
                                    border: "2px solid white",
                                    borderRadius: "10px",
                                    button: { width: '100%', height: '100%' },
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <FacebookShareButton
                                    url={'https://usdebt'}
                                    quote={'usdebt is'}
                                    hashtag={'#usdebt'}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <FacebookIcon size={24} round />
                                        <b>Facebook</b>
                                    </Box>
                                </FacebookShareButton>
                            </Box>
                            <Box
                                sx={{
                                    width: "32%",
                                    background: "#8f8f8f",
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    textTransform: "none",
                                    border: "2px solid white",
                                    borderRadius: "10px",
                                    button: { width: '100%', height: '100%' },
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <TwitterShareButton
                                    url={'https://usdebt'}
                                    quote={'usdebt is'}
                                    hashtag={'#usdebt'}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <TwitterIcon size={24} round />
                                        <b>Twitter</b>
                                    </Box>
                                </TwitterShareButton>
                            </Box>
                            <Box
                                sx={{
                                    width: "32%",
                                    background: "#8f8f8f",
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    textTransform: "none",
                                    border: "2px solid white",
                                    borderRadius: "10px",
                                    button: { width: '100%', height: '100%' },
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <EmailShareButton
                                    url={'https://usdebt'}
                                    quote={'usdebt is'}
                                    hashtag={'#usdebt'}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <EmailIcon size={24} round />
                                        <b>Email</b>
                                    </Box>
                                </EmailShareButton>
                            </Box>
                        </Box>
                    </Box>
                </Box> :
                <></>}
            {showPetitionToDialog ?
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
                            backgroundColor: 'black',
                            borderRadius: '30px',
                            boxShadow: "2px 0px 1px rgba(150, 150, 150, 0.5)",
                            padding: '20px',
                            width: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "28px",
                                    fontWeight: '500',
                                    color: "#FFFFFF",
                                }}
                            >
                                Decision makers
                            </Typography>
                            <Close
                                onClick={(e) => setShowPetitionToDialog(false)}
                                sx={{
                                    color: '#8f8f8f',
                                    ':hover': { color: 'white' },
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '80vh',
                                overflowY: 'auto',
                            }}
                        >
                            {petitionTo.map((petition_to) => {
                                return (
                                    <Box
                                        sx={{
                                            padding: '10px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '10px',
                                            borderTop: 'solid 1px #888888'
                                        }}
                                    >
                                        <AccountCircle
                                            sx={{
                                                color: '#888888',
                                                fontSize: '30px'
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '2px'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "20px",
                                                    fontWeight: '500',
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {petition_to.split(" (")[0]}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "16px",
                                                    fontWeight: '500',
                                                    color: "#888888",
                                                }}
                                            >
                                                {petition_to.split(" (")[1]}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box> :
                <></>
            }
        </>
    );
};
export default Home;
