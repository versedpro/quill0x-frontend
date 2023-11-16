
import { useEffect, useState, useRef } from "react";

import BannerVideo from "../assets/default-banner.mp4";
import SignerTable from "../components/signer-table";
import { Box, Container, Typography, Button, TextField, Input } from "@mui/material";
import { ContentCopy, Close, AccountCircle, Share } from "@mui/icons-material";
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';

import DarkX from "../assets/images/social/dark-x.png";
import LightFacebook from "../assets/images/social/light-facebook.png";
import DarkFacebook from "../assets/images/social/dark-facebook.png";

import { useAccount, useSignMessage, useContractWrite, useChainId } from 'wagmi';

import petitionAbi from "../abis/petition.json";
import usdebtAbi from "../abis/usdebt.json";
import Web3, { utils } from 'web3';
import Moralis from 'moralis';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import queryString from 'query-string';
import axios from 'axios';
import CommentTable from "../components/comment-table";

import ConfettiExplosion from 'react-confetti-explosion';

const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/oad0JCDVOhPo7Lmd1RMehRhABPr4Adj9');

const petitionAddress = '0x3ad9ab36fc543a43970238A28a0Cb17706898BCF';
const usdebtAddress = '0xdDA06BCe0E209825F741F0B7049e837493D41f2B';

const petitionContract = new web3.eth.Contract(petitionAbi, petitionAddress);
const usdebtContract = new web3.eth.Contract(usdebtAbi, usdebtAddress);

const SUBGRAPH_API_URL = 'https://api.studio.thegraph.com/query/51715/petition_test1/version/latest';

const web3Base = new Web3('https://base-goerli.g.alchemy.com/v2/3V1hmYNCN1z_Q6TOadrWE-8zyivKE7fM');

const petitionAddressBase = '0x2e3DB58f65DE9b710b77d3420B2Cc5F43D727984';
const usdebtAddressBase = '0x20e1EFC92624B5a35bd93695e0bba7E4bEFc2E43';

const petitionContractBase = new web3Base.eth.Contract(petitionAbi, petitionAddressBase);
const usdebtContractBase = new web3Base.eth.Contract(usdebtAbi, usdebtAddressBase);

const SUBGRAPH_API_URL_BASE = 'https://api.studio.thegraph.com/query/51715/petition_test1_base/version/latest';

const petitionQuery = `
  query {
    petitions {
      id
      active
      contractOwner
      title
      subtitle
      started
      to
      description
      goalSignature
      goalTokenHeld
      signers {
        id
        address
        token {
          id
          address
        }
        transactionHash
        time
        comment
      }
    }
  }
`

const chainLogo = {
    1: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
    5: "https://chainlist.org/unknown-logo.png",
    8453: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
    84531: "https://chainlist.org/unknown-logo.png",
}

const RotatingElement = styled(Box)(({ }) => ({
    width: '100px',
    height: '100px',
    animation: `nfLoaderSpin infinite 3s linear`,
    transformBox: "fill-box",
  
    "@keyframes nfLoaderSpin": {
      from: {
        transform: "rotateY(0deg)"
      },
      to: {
        transform: "rotateY(360deg)"
      }
    }
  }));

const Home = () => {

    const [twitterName, setTwitterName] = useState('');
    const [referralCode, setReferralCode] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { address } = useAccount();
    const chainId = useChainId();

    const walletRef = useRef({ address, chainId, isFirst: true, isSigned: false });

    const CAGR = 0.1095;
    const initialDebt = 30928910000000;
    const perSecondGrowthRate = Math.pow(1 + CAGR, 1 / (365 * 24 * 60 * 60)) - 1;

    const [nextGoalSignature, setNextGoalSignature] = useState(0);
    const [nextGoalUsdebtHeld, setNextGoalUsdebtHeld] = useState(0);
    const [nextGoalUsdebtText, setNextGoalUsdebtText] = useState(0);

    const [usdebtPrice, setUsdebtPrice] = useState(0);
    const [usdebtBalanceValue, setUsdebtBalanceValue] = useState(0);
    const [usdebtBalance, setUsdebtBalance] = useState("");
    const [ethBalanceValue, setEthBalanceValue] = useState(0);
    const [usdebtTotalSupply, setUsdebtTotalSupply] = useState("");
    const [ethTotalSupply, setEthTotalSupply] = useState("");

    const [DebtClock, setDebtClock] = useState('');
    const [DebtClockOptimized, setDebtClockOptimized] = useState('');
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const [comment, setComment] = useState("");
    const [referral, setReferral] = useState("");
    const [selectedTab, setSelectedTab] = useState("signers");

    const [isSigned, setIsSigned] = useState(false);

    const [petitionTitle, setPetitionTitle] = useState("");
    const [petitionSubtitle, setPetitionSubtitle] = useState("");
    const [petitionStarted, setPetitionStarted] = useState("");
    const [petitionTo, setPetitionTo] = useState([]);
    const [petitionDescription, setPetitionDescription] = useState([]);
    const [commentURIs, setCommentURIs] = useState([]);
    const [comments, setComments] = useState([]);

    const [ethSignersInfo, setEthSignersInfo] = useState([]);
    const [usdebtSignersInfo, setUsdebtSignersInfo] = useState([]);
    const [totalUsdebt, setTotalUsdebt] = useState('0.0K');
    const [totalUsdebtValue, setTotalUsdebtValue] = useState(0);

    const [showPetitionToDialog, setShowPetitionToDialog] = useState(false);
    const [showSigningToken, setShowSigningToken] = useState(false);
    const [showCommentExplanation, setShowCommentExplanation] = useState(false);

    const [showContractInfo, setShowContractInfo] = useState("");

    const [showEthSigning, setShowEthSigning] = useState(false);
    const [isExploding, setIsExploding] = useState(false);

    const { data: signature, signMessage } = useSignMessage({
        message: `By signing this petition, you are making an impact. Your signature advocates for responsible fiscal management and innovative solutions to the U.S. National Debt Crisis.`,
        async onSuccess(data) {
            try {
                if (chainId == 1 || chainId == 5) {
                    await petitionSign({
                        from: address,
                        args: [usdebtAddress]
                    })
                } else if (chainId == 8453 || chainId == 84531) {
                    await petitionSignBase({
                        from: address,
                        args: [usdebtAddressBase]
                    })
                }
                
            } catch (error) {
                console.log('Failed signing with USDEBT:', error);
            }

        }
    })

    const { writeAsync: petitionSign } = useContractWrite({
        address: petitionAddress,
        abi: petitionAbi,
        functionName: "signPetition",
        async onSuccess(data) {
            console.log('Sign With USDEBT Transaction success!');

            await onSubmitComment();
            await onSubmitReferral();

        }
    });

    const { writeAsync: petitionSignBase } = useContractWrite({
        address: petitionAddressBase,
        abi: petitionAbi,
        functionName: "signPetition",
        async onSuccess(data) {
            console.log('Sign With USDEBT Transaction success!');

            await onSubmitComment();
            await onSubmitReferral();

        }
    });

    const { writeAsync: petitionSetComment } = useContractWrite({
        address: petitionAddress,
        abi: petitionAbi,
        functionName: "setComment",
    });

    const { writeAsync: petitionSetCommentBase } = useContractWrite({
        address: petitionAddressBase,
        abi: petitionAbi,
        functionName: "setComment",
    });

    const client = new ApolloClient({
        uri: SUBGRAPH_API_URL,
        cache: new InMemoryCache(),
        queryDeduplication: false,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
                nextFetchPolicy: 'cache-and-network',
            },
        },
    });

    const clientBase = new ApolloClient({
        uri: SUBGRAPH_API_URL_BASE,
        cache: new InMemoryCache(),
        queryDeduplication: false,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
                nextFetchPolicy: 'cache-and-network',
            },
        },
    });

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
    }

    const onSubmitReferral = async () => {
        if (!referral) {
            return;
        }
        try {
            const res = await axios.post("https://auth.petitions3.com/api/user/sign_petition", null, { params: { twitterName, referral } });
            console.log("submit referral res:", res);
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmitComment = async () => {
        if (!comment) {
            return;
        }
        const jsonString = JSON.stringify({ comment: comment });
        const blob = new Blob([jsonString], { type: 'application/json' });
        const file = new File([blob], 'comment.json', { type: 'application/json' });

        const formdata = new FormData();
        formdata.append("file", file);

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formdata, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDQxZDBhMy02NzA3LTQ4Y2MtODBjNS1lODM1NTNjNThhMjAiLCJlbWFpbCI6InpvcmFuem92a291c2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjM2YzhmMTI4ZDc4ODVkY2EwZDg0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDM1MjE2Y2Q0ZTRmYjBiOGI1ZDlhMTA4ZDRjNWVlNzM1ZTE3ZmVhODQ0NTUzODA1ZjkxYjljNTk0YzNjMzAzYyIsImlhdCI6MTY4MDM3MDExOX0.A9B7lBRPtITofd3dGBKbXRPbNKYHcXPkyfEjXvp2Qns`,
                }
            });
            console.log("ipfs hash:", res.data.IpfsHash);

            if (chainId == 1 || chainId == 5) {
                await petitionSetComment({
                    from: address,
                    args: [res.data.IpfsHash]
                })
            } else if (chainId == 8453 || chainId == 84531) {
                await petitionSetCommentBase({
                    from: address,
                    args: [res.data.IpfsHash]
                })
            }
            console.log('Setting Comment Transaction success!');

        } catch (error) {
            console.error(error);
        }
    }

    const onSignPetition = async () => {
        setIsExploding(false);
        
        try {
            if (address) {
                if (usdebtBalanceValue > 0) {
                    setIsLoading(true);
                    signMessage();
                } else if (ethBalanceValue > 0) {
                    setShowEthSigning(true);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        };
    }

    const fetchContractData = async (address, chainId, isSigned) => {
        console.log("fetchContractData", address, chainId, isSigned, walletRef.current.isFirst);
        try {
            const data = await client.query({ query: gql(petitionQuery) });
            const petition_data = data.data.petitions;
            console.log("petition_data:", petition_data);
            const dataBase = await clientBase.query({ query: gql(petitionQuery) });
            const petition_dataBase = dataBase.data.petitions;
            console.log("petition_dataBase:", petition_dataBase);
            if (petition_data.length != 0 && petition_dataBase.length != 0) {
                setPetitionTitle(petition_data[0].title ? petition_data[0].title : "");
                setPetitionSubtitle(petition_data[0].subtitle ? petition_data[0].subtitle : "");
                setPetitionStarted(petition_data[0].started ? petition_data[0].started : "");
                let tmpPetitionTo = [];
                if (petition_data[0].to) {
                    petition_data[0].to.split("), ").map((item) => {
                        tmpPetitionTo.push(item);
                    })
                }
                setPetitionTo(tmpPetitionTo);
                setPetitionDescription(petition_data[0].description ? petition_data[0].description.split("  ") : []);

                setNextGoalSignature(petition_data[0].goalSignature ? Number(petition_data[0].goalSignature) : 0);
                const goalTokenHeld = petition_data[0].goalTokenHeld ? Number(petition_data[0].goalTokenHeld) : 0;
                setNextGoalUsdebtHeld(goalTokenHeld);
                if (goalTokenHeld / 1000000000000 >= 1) {
                    setNextGoalUsdebtText(`${(goalTokenHeld / 1000000000000).toFixed(1)}T`);
                } else if (goalTokenHeld / 1000000000 >= 1) {
                    setNextGoalUsdebtText(`${(goalTokenHeld / 1000000000).toFixed(1)}B`);
                } else if (goalTokenHeld / 1000000 >= 1) {
                    setNextGoalUsdebtText(`${(goalTokenHeld / 1000000).toFixed(1)}M`);
                } else if (goalTokenHeld / 1000 >= 1) {
                    setNextGoalUsdebtText(`${(goalTokenHeld / 1000).toFixed(1)}K`);
                } else {
                    setNextGoalUsdebtText(`${(goalTokenHeld).toFixed(1)}`);
                }

                if (address) {
                    if (chainId == 1 || chainId == 5) {
                        const tmpAddressBalance = await usdebtContract.methods.balanceOf(address).call();

                        const balance = Number(web3.utils.fromWei(tmpAddressBalance, 'ether'));
                        console.log("usdebt balance:", balance);
                        setUsdebtBalanceValue(balance);
                        if (balance / 1000000000000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000000000000).toFixed(1)}T`);
                        } else if (balance / 1000000000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000000000).toFixed(1)}B`);
                        } else if (balance / 1000000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000000).toFixed(1)}M`);
                        } else if (balance / 1000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000).toFixed(1)}K`);
                        } else {
                            setUsdebtBalance(`${(balance).toFixed(1)}`);
                        }

                        const tmpAddressEthBalance = await web3.eth.getBalance(address);

                        const eth_balance = Number(web3.utils.fromWei(tmpAddressEthBalance, 'ether'));
                        console.log("eth balance:", eth_balance);
                        setEthBalanceValue(eth_balance);
                    } else if (chainId == 8453 || chainId == 84531) {
                        const tmpAddressBalance = await usdebtContractBase.methods.balanceOf(address).call();

                        const balance = Number(web3Base.utils.fromWei(tmpAddressBalance, 'ether'));
                        console.log("usdebt balance:", balance);
                        setUsdebtBalanceValue(balance);
                        if (balance / 1000000000000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000000000000).toFixed(1)}T`);
                        } else if (balance / 1000000000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000000000).toFixed(1)}B`);
                        } else if (balance / 1000000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000000).toFixed(1)}M`);
                        } else if (balance / 1000 >= 1) {
                            setUsdebtBalance(`${(balance / 1000).toFixed(1)}K`);
                        } else {
                            setUsdebtBalance(`${(balance).toFixed(1)}`);
                        }

                        const tmpAddressEthBalance = await web3Base.eth.getBalance(address);

                        const eth_balance = Number(web3Base.utils.fromWei(tmpAddressEthBalance, 'ether'));
                        console.log("eth balance:", eth_balance);
                        setEthBalanceValue(eth_balance);
                    } else {
                        setUsdebtBalanceValue(0);
                        setUsdebtBalance("");
                        setEthBalanceValue(0);
                    }
                }

                let is_signed = false;
                let total_usdebt = 0;
                let tmpUsdebtSignersInfo = [];
                let tmpEthSignersInfo = [];
                let tmpCommentURIs = [];
                for (let i = 0; i < petition_data[0].signers.length; i++) {

                    if (chainId == 1 || chainId == 5) {
                        if (address && petition_data[0].signers[i].address.toLowerCase() == address.toLowerCase()) {
                            is_signed = true;
                        }
                    }

                    tmpCommentURIs.push({ signer: petition_data[0].signers[i].address, commentURI: petition_data[0].signers[i].comment });

                    // const eth_balance = await web3.eth.getBalance(petition_data[0].signers[i].address);
                    const token_balance = await usdebtContract.methods.balanceOf(petition_data[0].signers[i].address).call();

                    const balance = Number(web3.utils.fromWei(token_balance, 'ether'));

                    total_usdebt += balance;

                    if (petition_data[0].signers[i].token.address.toLowerCase() == usdebtAddress.toLowerCase()) {
                        tmpUsdebtSignersInfo.push({
                            signerAddress: petition_data[0].signers[i].address,
                            usdebtBalance: Number(web3.utils.fromWei(token_balance, 'ether')).toFixed(2),
                            time: petition_data[0].signers[i].time,
                            transactionHash: petition_data[0].signers[i].transactionHash,
                            chainId,
                            // ethBalance: Number(web3.utils.fromWei(eth_balance, 'ether')).toFixed(2)
                        });
                    } else {
                        tmpEthSignersInfo.push({
                            signerAddress: petition_data[0].signers[i].address,
                            usdebtBalance: Number(web3.utils.fromWei(token_balance, 'ether')).toFixed(2),
                            time: petition_data[0].signers[i].time,
                            transactionHash: petition_data[0].signers[i].transactionHash,
                            chainId,
                            // ethBalance: Number(web3.utils.fromWei(eth_balance, 'ether')).toFixed(2)
                        });
                    }
                }
                for (let i = 0; i < petition_dataBase[0].signers.length; i++) {

                    if (chainId == 8453 || chainId == 84531) {
                        if (address && petition_dataBase[0].signers[i].address.toLowerCase() == address.toLowerCase()) {
                            is_signed = true;
                        }
                    }

                    tmpCommentURIs.push({ signer: petition_dataBase[0].signers[i].address, commentURI: petition_dataBase[0].signers[i].comment });

                    const token_balance = await usdebtContractBase.methods.balanceOf(petition_dataBase[0].signers[i].address).call();

                    const balance = Number(web3Base.utils.fromWei(token_balance, 'ether'));

                    total_usdebt += balance;

                    if (petition_dataBase[0].signers[i].token.address.toLowerCase() == usdebtAddressBase.toLowerCase()) {
                        tmpUsdebtSignersInfo.push({
                            signerAddress: petition_dataBase[0].signers[i].address,
                            usdebtBalance: Number(web3Base.utils.fromWei(token_balance, 'ether')).toFixed(2),
                            time: petition_dataBase[0].signers[i].time,
                            transactionHash: petition_dataBase[0].signers[i].transactionHash,
                            chainId,
                        });
                    } else {
                        tmpEthSignersInfo.push({
                            signerAddress: petition_dataBase[0].signers[i].address,
                            usdebtBalance: Number(web3Base.utils.fromWei(token_balance, 'ether')).toFixed(2),
                            time: petition_dataBase[0].signers[i].time,
                            transactionHash: petition_dataBase[0].signers[i].transactionHash,
                            chainId,
                        });
                    }
                }

                tmpUsdebtSignersInfo.sort((a, b) => { return Number(b.time) - Number(a.time) })
                tmpEthSignersInfo.sort((a, b) => { return Number(b.time) - Number(a.time) })

                console.log("exploding", walletRef.current.isFirst, isSigned, is_signed)
                if (!walletRef.current.isFirst && isSigned == false && is_signed == true) {
                    setIsLoading(false);
                    setIsExploding(true);
                }

                walletRef.current = { address, chainId, isFirst: false, isSigned: is_signed }
                setIsSigned(is_signed);
                setUsdebtSignersInfo(tmpUsdebtSignersInfo);
                setEthSignersInfo(tmpEthSignersInfo);
                setCommentURIs(tmpCommentURIs);

                setTotalUsdebtValue(total_usdebt);
                if (total_usdebt / 1000000000000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000000000000).toFixed(1)}T`);
                } else if (total_usdebt / 1000000000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000000000).toFixed(1)}B`);
                } else if (total_usdebt / 1000000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000000).toFixed(1)}M`);
                } else if (total_usdebt / 1000 >= 1) {
                    setTotalUsdebt(`${(total_usdebt / 1000).toFixed(1)}K`);
                } else {
                    setTotalUsdebt(`${(total_usdebt).toFixed(1)}`);
                }

                let tmpComments = [];
                tmpCommentURIs.map(async (tmpCommentURI) => {
                    if (tmpCommentURI.commentURI) {
                        const res = await axios.get(`https://gateway.pinata.cloud/ipfs/${tmpCommentURI.commentURI}`);
                        console.log(res);
                        tmpComments.push({ signer: tmpCommentURI.signer, comment: res.data.comment, chainId });
                    }
                })
                setComments(tmpComments);
            }
        } catch (error) {
            console.error("Error:", error)
        }

    }

    useEffect(() => {
        walletRef.current = { address, chainId, isFirst: walletRef.current.isFirst, isSigned: walletRef.current.isSigned }
    }, [address, chainId])

    useEffect(() => {
        fetchContractData(walletRef.current.address, walletRef.current.chainId, walletRef.current.isSigned);
        // const intervalId = setInterval(
        //     () => {
        //         if(!walletRef.current.isFirst) {
        //             fetchContractData(walletRef.current.address, walletRef.current.chainId, walletRef.current.isSigned);
        //         }
        //     }, 3000
        // );
        // return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {

        const twitterName = localStorage.getItem('twitter_name');
        console.log("from storage twitter_name", twitterName);
        if (twitterName) {
            setTwitterName(twitterName);
        }

        const referralCode = localStorage.getItem('referral_code');
        console.log("from storage referral_code", referralCode);
        if (referralCode) {
            setReferralCode(referralCode);
        }

        const fetchUsdebtPrice = async () => {
            try {
                let usdebt_total_supply;
                if (chainId == 1 || chainId == 5) {
                    usdebt_total_supply = Number(web3.utils.fromWei(await usdebtContract.methods.totalSupply().call(), 'ether')).toFixed(2);
                    console.log("usdebt total supply:", usdebt_total_supply);

                    if (usdebt_total_supply / 1000000000000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000000000000).toFixed(1)}T`);
                    } else if (usdebt_total_supply / 1000000000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000000000).toFixed(1)}B`);
                    } else if (usdebt_total_supply / 1000000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000000).toFixed(1)}M`);
                    } else if (usdebt_total_supply / 1000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000).toFixed(1)}K`);
                    } else {
                        setUsdebtTotalSupply(`${(usdebt_total_supply).toFixed(1)}`);
                    }
                } else if (chainId == 8453 || chainId == 84531) {
                    usdebt_total_supply = Number(web3Base.utils.fromWei(await usdebtContractBase.methods.totalSupply().call(), 'ether')).toFixed(2);
                    console.log("usdebt total supply:", usdebt_total_supply);

                    if (usdebt_total_supply / 1000000000000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000000000000).toFixed(1)}T`);
                    } else if (usdebt_total_supply / 1000000000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000000000).toFixed(1)}B`);
                    } else if (usdebt_total_supply / 1000000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000000).toFixed(1)}M`);
                    } else if (usdebt_total_supply / 1000 >= 1) {
                        setUsdebtTotalSupply(`${(usdebt_total_supply / 1000).toFixed(1)}K`);
                    } else {
                        setUsdebtTotalSupply(`${(usdebt_total_supply).toFixed(1)}`);
                    }
                } else {
                    setUsdebtTotalSupply("");
                }

                await Moralis.start({
                    apiKey: "Xi61BR8j5O09XdEWAtFf7m4UYSatHm3tsXIF49u1SLbmZMmbxinok879gudDlD64"
                });

                let response;
                if (chainId == 1 || chainId == 5) {
                    response = await Moralis.EvmApi.token.getTokenPrice({
                        "chain": "0x1",
                        "address": '0x00c5CA160A968f47e7272A0CFCda36428F386CB6'
                    });

                    console.log(response.raw);
                    setUsdebtPrice(response.raw.usdPrice);
                } else if (chainId == 8453 || chainId == 84531) {
                    response = await Moralis.EvmApi.token.getTokenPrice({
                        "chain": "0x8453",
                        "address": '0x00c5CA160A968f47e7272A0CFCda36428F386CB6'
                    });

                    console.log(response.raw);
                    setUsdebtPrice(response.raw.usdPrice);
                } else {
                    setUsdebtPrice(0);
                }
            } catch (error) {
                console.log(error);
            }

        }
        fetchUsdebtPrice();

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
                        paddingBottom: "200px",
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
                        gap: '30px'
                    }}
                >
                    {/* <Box
                        sx={{
                            padding: "20px 0",
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: { md: 'row', xs: 'column' },
                                justifyContent: { md: 'space-between', xs: 'start' },
                                gap: { md: '0', xs: '20px' }
                            }}
                        >
                            <Box
                                sx={{
                                    width: { md: '30%', xs: '100%' },
                                    height: '250px',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '20px',
                                    border: 'solid 1px #ba0d0d',
                                    backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                            </Box>
                            <Box
                                sx={{
                                    width: { md: '65%', xs: '100%' },
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: 'solid 1px #333333',
                                    gap: '20px'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <img alt="" src={"./usdebt.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '30px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        USDEBT
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                    }}
                                >
                                    Price: $ {usdebtPrice}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                    }}
                                >
                                    Total Supply: {usdebtTotalSupply}
                                </Typography>
                            </Box>
                        </Box>
                    </Box> */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                paddingTop: { md: '30px', xs: '10px' },
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'end',
                                alignItems: 'center',
                                gap: '10px',
                                img: { width: { md: '30px', xs: '25px' }, height: { md: '30px', xs: '25px' }, objectFit: 'contain' }
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { md: 'row', xs: 'column' },
                                    gap: { md: '20px', xs: '10px' },
                                    alignItems: { md: 'center', xs: 'end' }
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '20px',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {usdebtBalanceValue > 0 ?
                                            <>
                                                <img alt="" src={"./usdebt.png"} />
                                                {/* <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontSize: '30px',
                                                    fontWeight: '700',
                                                    textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                                }}
                                            >
                                                USDEBT
                                            </Typography> */}
                                            </> :
                                            <></>}
                                        {/* {ethBalanceValue > 0 ?
                                        <>
                                            <img alt="" src={"./eth.png"} />
                                            <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontSize: '30px',
                                                        fontWeight: '700',
                                                        textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                                    }}
                                                >
                                                    ETH
                                                </Typography>
                                        </> :
                                        <></>
                                    } */}
                                    </Box>
                                    {usdebtBalanceValue > 0 ?
                                        <Typography
                                            sx={{
                                                color: '#8f8f8f',
                                                fontSize: { md: '18px', xs: '16px' },
                                                fontFamily: "RobotoSlabFont",
                                                fontWeight: 500,
                                                lineHeight: '24px',
                                                textAlign: 'cetner'
                                            }}
                                        >
                                            {usdebtBalance} USDEBT tokens detected.
                                        </Typography> :
                                        <Typography
                                            sx={{
                                                color: '#FF3B30',
                                                fontSize: { md: '18px', xs: '16px' },
                                                fontFamily: "RobotoSlabFont",
                                                fontWeight: 500,
                                                lineHeight: '24px',
                                                textAlign: 'cetner'
                                            }}
                                        >
                                            Awareness tokens not detected.
                                        </Typography>
                                    }
                                </Box>
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: { md: '14px', xs: '12px' },
                                        fontWeight: '500',
                                        textTransform: "none",
                                        letterSpacing: '0px',
                                        cursor: 'pointer'
                                    }}
                                >LEARN MORE</Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                height: '3px',
                                borderRadius: '1px',
                                backgroundColor: '#888888'
                            }}
                        >
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: { md: 'none', xs: 'flex' },
                                flexDirection: 'column',
                                video: {
                                    border: "0.6px solid #333333",
                                    borderRadius: "20px"
                                },
                            }}
                        >
                            {window.innerWidth <= 1000 && <video src={BannerVideo} loop autoPlay controls />}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { md: "20px", xs: "12px" },
                                    fontWeight: '500',
                                    color: "#FFFFFF"
                                }}
                            >
                                Deployed on
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    img: { width: { md: '30px', xs: '20px' }, height: { md: '30px', xs: '20px' }, objectFit: 'contain', borderRadius: '100%' }
                                }}
                            >
                                <Typography
                                    onClick={(e) => { setShowContractInfo("Ethereum") }}
                                    sx={{
                                        fontSize: { md: "20px", xs: "12px" },
                                        fontWeight: '500',
                                        color: "#FFFFFF",
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Ethereum
                                </Typography>
                                <img src={chainLogo[1]} alt="chainLogo" />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    img: { width: { md: '30px', xs: '20px' }, height: { md: '30px', xs: '20px' }, objectFit: 'contain', borderRadius: '100%' }
                                }}
                            >
                                <Typography
                                    onClick={(e) => { setShowContractInfo("Base") }}
                                    sx={{
                                        fontSize: { md: "20px", xs: "12px" },
                                        fontWeight: '500',
                                        color: "#FFFFFF",
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Base
                                </Typography>
                                <img src={chainLogo[8453]} alt="chainLogo" />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    width: { xs: "100%" },
                                    fontSize: { md: "28px", xs: "24px" },
                                    fontWeight: '700',
                                    color: "#FFFFFF",
                                    textAlign: { md: 'center', xs: 'start' },
                                }}
                            >
                                {petitionTitle}
                            </Typography>
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
                                width: { md: "50%", xs: "100%" },
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '10px',
                                        display: 'flex',
                                        borderRadius: '8px',
                                        border: 'solid 1px #7df9ff'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${Math.ceil((ethSignersInfo.length + usdebtSignersInfo.length) * 100.0 / nextGoalSignature)}%`,
                                            height: '100%',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '8px'
                                        }}
                                    ></Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#7df9ff',
                                                fontSize: { md: '22px', xs: '18px' },
                                                fontWeight: '500',
                                                textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
                                            }}
                                        >{numberWithCommas(ethSignersInfo.length + usdebtSignersInfo.length)}</Typography>
                                        <Typography
                                            sx={{
                                                color: '#7df9ff',
                                                fontSize: { md: '22px', xs: '16px' },
                                                textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
                                            }}
                                        >Signatures</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontSize: { md: '22px', xs: '18px' },
                                                fontWeight: '500'
                                            }}
                                        >{numberWithCommas(nextGoalSignature)}</Typography>
                                        <Typography
                                            sx={{
                                                color: '#8f8f8f',
                                                fontSize: { md: '22px', xs: '16px' },
                                            }}
                                        >Target Goal</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '10px',
                                        display: 'flex',
                                        borderRadius: '8px',
                                        border: 'solid 1px #7df9ff'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${Math.ceil(totalUsdebtValue * 100.0 / nextGoalUsdebtHeld)}%`,
                                            height: '100%',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '8px'
                                        }}
                                    ></Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#7df9ff',
                                                fontSize: { md: '22px', xs: '18px' },
                                                fontWeight: '500',
                                                textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
                                            }}
                                        >{totalUsdebt}</Typography>
                                        <Typography
                                            sx={{
                                                color: '#7df9ff',
                                                fontSize: { md: '22px', xs: '16px' },
                                                textShadow: { md: "0px 0px 3px #7DF9FF", xs: "0px 0px 1px #7DF9FF" },
                                            }}
                                        >USDEBT Held</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontSize: { md: '22px', xs: '18px' },
                                                fontWeight: '500'
                                            }}
                                        >{nextGoalUsdebtText}</Typography>
                                        <Typography
                                            sx={{
                                                color: '#8f8f8f',
                                                fontSize: { md: '22px', xs: '16px' },
                                            }}
                                        >Target Goal</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {(ethBalanceValue > 0 || usdebtBalanceValue > 0) && !isSigned ?
                                <>
                                    <TextField
                                        onChange={(e) => { if (e.target.value.length < 280) { setComment(e.target.value) } }}
                                        value={comment}
                                        placeholder="Share your comments"
                                        multiline
                                        maxRows={2}
                                        sx={{
                                            marginTop: '20px',
                                            width: '100%',
                                            height: '80px',
                                            border: 'solid 1px white',
                                            '.MuiInputBase-root': { color: 'white' },
                                            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            marginTop: '20px',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: { md: 'row', xs: 'column' },
                                            gap: { md: '20px', xs: '10px' },
                                            justifyContent: 'end',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: { md: '70%', xs: '100%' },
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: { md: "18px", xs: "14px" },
                                                    fontWeight: '500',
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                Referral Code:
                                            </Typography>
                                            <Button
                                                onClick={(e) => { setShowCommentExplanation(true); }}
                                                sx={{
                                                    fontSize: { md: "18px", xs: "14px" },
                                                    fontWeight: '500',
                                                    color: "#FFFFFF",
                                                    textTransform: 'none',
                                                    ":hover": { background: 'none' }
                                                }}
                                            >
                                                (learn more...)
                                            </Button>
                                        </Box>
                                        <Input
                                            onChange={(e) => setReferral(e.target.value)}
                                            value={referral}
                                            placeholder="Enter Code"
                                            sx={{
                                                color: 'white',
                                                width: { md: '30%', xs: '100%' },
                                                border: 'solid 1px white',
                                                borderRadius: '8px',
                                                paddingLeft: '10px',
                                                paddingRight: '10px'
                                            }}
                                        />
                                    </Box>
                                </> :
                                <></>
                            }
                            <Box
                                sx={{
                                    display: { md: 'none', xs: 'flex' },
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    paddingTop: '20px'
                                }}
                            >
                                <Button
                                    onMouseOver={() => { if (!(ethBalanceValue > 0 || usdebtBalanceValue > 0)) setShowSigningToken(true) }}
                                    onMouseOut={() => { if (!(ethBalanceValue > 0 || usdebtBalanceValue > 0)) setShowSigningToken(false) }}
                                    onClick={(e) => { if (ethBalanceValue > 0 || usdebtBalanceValue > 0) onSignPetition() }}
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: 0,
                                        paddingBottom: '20px',
                                        ':hover': { background: 'transparent' },
                                        ':disabled': { opacity: '30%' }
                                    }}
                                    disabled={isSigned}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            backgroundColor: '#000',
                                            color: "#fff",
                                            lineHeight: "32px",
                                            textAlign: "center",
                                            border: "2px solid #7df9ff",
                                            borderRadius: "8px",
                                            padding: "8px 0px",
                                            boxShadow: "0px 2px 8px rgba(0,0,0,0.16)",
                                            ":hover": { background: "#111111" },
                                            ":disabled": { color: "#ffffff70", background: "#111111" },
                                            outline: "none",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            alignItems: 'center',
                                            img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' }
                                        }}
                                    >
                                        {ethBalanceValue > 0 || usdebtBalanceValue > 0 ?
                                            <>
                                                <img src="/P3WebAppLogo.png" alt="chainLogo" />
                                                <Typography
                                                    sx={{
                                                        fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                        fontWeight: '500',
                                                        textTransform: "none",
                                                        letterSpacing: '0px',
                                                    }}
                                                >{isSigned ? "YOU HAVE SIGNED" : "SIGN"}</Typography>
                                            </> :
                                            <Typography
                                                sx={{
                                                    fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                    fontWeight: '500',
                                                    textTransform: "none",
                                                    letterSpacing: '0px',
                                                }}
                                            >BUY AWARENESS TOKEN</Typography>
                                        }
                                    </Box>
                                    {showSigningToken ?
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: '-90px',
                                                left: 0,
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px',
                                                borderRadius: '8px',
                                                border: '1px solid #888888',
                                                background: '#000000',
                                                zIndex: 1,
                                                a: { width: '30px', height: '30px' },
                                                img: { width: '100%', height: '100%', objectFit: 'contain' },
                                            }}
                                        >
                                            <a href="https://app.uniswap.org/#/swap?&chain=mainnet&use=v2&outputCurrency=0x00c5ca160a968f47e7272a0cfcda36428f386cb6"><img src="/usdebt.png" alt="" /></a>
                                            <Box
                                                sx={{
                                                    height: '2px',
                                                    width: '100%',
                                                    background: '#333333'
                                                }}
                                            ></Box>
                                            {/* <a href="https://baseswap.fi/basicswap"><img src="/eth.png" alt="" /></a> */}
                                            <Typography
                                                sx={{
                                                    fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                    fontWeight: '500',
                                                    textTransform: "none",
                                                    letterSpacing: '0px',
                                                }}
                                            >LEARN MORE</Typography>
                                        </Box> :
                                        <></>
                                    }
                                </Button>
                                <Button
                                    onClick={(e) => { console.log(showShareDialog); setShowShareDialog(true) }}
                                    sx={{
                                        width: '100%',
                                        minHeight: '50px',
                                        backgroundColor: '#000',
                                        color: "#fff",
                                        fontSize: "24px",
                                        lineHeight: "32px",
                                        textAlign: "center",
                                        border: "2px solid #7df9ff",
                                        borderRadius: "8px",
                                        padding: "8px 0px",
                                        boxShadow: "0px 2px 8px rgba(0,0,0,0.16)",
                                        ":hover": { background: "#111111" },
                                        ":disabled": { color: "#ffffff70", background: "#111111" },
                                        outline: "none"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '20px',
                                            alignItems: 'center',
                                            img: { width: '40px', height: '40px', objectFit: 'contain', borderRadius: '100%' }
                                        }}
                                    >
                                        <Share sx={{ color: "#7df9ff" }} />
                                        <Typography
                                            sx={{
                                                fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                fontWeight: '500',
                                                textTransform: "none",
                                                letterSpacing: '0px',
                                            }}
                                        >SHARE AND EARN</Typography>
                                    </Box>
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: { md: 'flex', xs: 'none' },
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    paddingTop: '20px'
                                }}
                            >
                                <Button
                                    onMouseOver={() => { if (!(ethBalanceValue > 0 || usdebtBalanceValue > 0)) setShowSigningToken(true) }}
                                    onMouseOut={() => { if (!(ethBalanceValue > 0 || usdebtBalanceValue > 0)) setShowSigningToken(false) }}
                                    onClick={(e) => { if (ethBalanceValue > 0 || usdebtBalanceValue > 0) onSignPetition() }}
                                    sx={{
                                        position: 'relative',
                                        width: '45%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: 0,
                                        paddingBottom: '20px',
                                        ':hover': { background: 'transparent' },
                                        ':disabled': { opacity: '30%' }
                                    }}
                                    disabled={isSigned}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minHeight: '50px',
                                            backgroundColor: '#000',
                                            color: "#fff",
                                            lineHeight: "32px",
                                            textAlign: "center",
                                            border: "2px solid #7df9ff",
                                            borderRadius: "8px",
                                            padding: "8px 0px",
                                            boxShadow: "0px 2px 8px rgba(0,0,0,0.16)",
                                            ":hover": { background: "#111111" },
                                            ":disabled": { color: "#ffffff70", background: "#111111" },
                                            outline: "none",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            alignItems: 'center',
                                            img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' }
                                        }}
                                    >
                                        {ethBalanceValue > 0 || usdebtBalanceValue > 0 ?
                                            <>
                                                <img src="/P3WebAppLogo.png" alt="chainLogo" />
                                                <Typography
                                                    sx={{
                                                        fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                        fontWeight: '500',
                                                        textTransform: "none",
                                                        letterSpacing: '0px',
                                                    }}
                                                >{isSigned ? "YOU HAVE SIGNED" : "SIGN"}</Typography>
                                            </> :
                                            <Typography
                                                sx={{
                                                    fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                    fontWeight: '500',
                                                    textTransform: "none",
                                                    letterSpacing: '0px',
                                                }}
                                            >BUY AWARENESS TOKEN</Typography>
                                        }
                                    </Box>
                                    {showSigningToken ?
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: '-90px',
                                                left: 0,
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px',
                                                borderRadius: '8px',
                                                border: '1px solid #888888',
                                                background: '#000000',
                                                zIndex: 1,
                                                a: { width: '30px', height: '30px' },
                                                img: { width: '100%', height: '100%', objectFit: 'contain' },
                                            }}
                                        >
                                            <a href="https://app.uniswap.org/#/swap?&chain=mainnet&use=v2&outputCurrency=0x00c5ca160a968f47e7272a0cfcda36428f386cb6"><img src="/usdebt.png" alt="" /></a>
                                            <Box
                                                sx={{
                                                    height: '2px',
                                                    width: '100%',
                                                    background: '#333333'
                                                }}
                                            ></Box>
                                            {/* <a href="https://baseswap.fi/basicswap"><img src="/eth.png" alt="" /></a> */}
                                            <Typography
                                                sx={{
                                                    fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                    fontWeight: '500',
                                                    textTransform: "none",
                                                    letterSpacing: '0px',
                                                }}
                                            >LEARN MORE</Typography>
                                        </Box> :
                                        <></>
                                    }
                                </Button>
                                <Button
                                    onClick={(e) => { console.log(showShareDialog); setShowShareDialog(true) }}
                                    sx={{
                                        width: '45%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: 0
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            minHeight: '50px',
                                            backgroundColor: '#000',
                                            color: "#fff",
                                            lineHeight: "32px",
                                            textAlign: "center",
                                            border: "2px solid #7df9ff",
                                            borderRadius: "8px",
                                            padding: "8px 0px",
                                            boxShadow: "0px 2px 8px rgba(0,0,0,0.16)",
                                            ":hover": { background: "#111111" },
                                            ":disabled": { color: "#ffffff70", background: "#111111" },
                                            outline: "none",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            alignItems: 'center',
                                            img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' }
                                        }}
                                    >
                                        <Share sx={{ color: "#7df9ff" }} />
                                        <Typography
                                            sx={{
                                                fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                fontWeight: '500',
                                                textTransform: "none",
                                                letterSpacing: '0px',
                                            }}
                                        >SHARE AND EARN</Typography>
                                    </Box>
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "50%",
                                display: 'flex',
                                flexDirection: 'column',
                                video: {
                                    border: "0.6px solid #333333",
                                    borderRadius: "20px",
                                    marginBottom: '20px'
                                },
                            }}
                        >
                            {window.innerWidth > 1000 && <video src={BannerVideo} loop autoPlay controls />}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginTop: { xs: "10px" },
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: "#111111",
                            padding: '20px',
                            borderRadius: '8px',
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
                                    fontSize: { md: "18px", xs: "18px" },
                                    lineHeight: { md: '40px', xs: '32px' },
                                    color: "#FFFFFF"
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
                                            fontSize: { md: "16px", xs: "12px" },
                                            lineHeight: { md: '40px', xs: '32px' },
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        Started by
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
                                            fontSize: { md: "16px", xs: "12px" },
                                            lineHeight: { md: '40px', xs: '32px' },
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {(chainId == 1 || chainId == 5) ? petitionAddress.substring(0, 4) + "..." + petitionAddress.substring(petitionAddress.length - 4) : ((chainId == 8453 || chainId == 84531) ? petitionAddressBase.substring(0, 4) + "..." + petitionAddressBase.substring(petitionAddressBase.length - 4) : "")}
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
                                            fontSize: { md: "16px", xs: "12px" },
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
                                                fontSize: { md: "16px", xs: "12px" },
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
                                                fontSize: { md: "16px", xs: "14px" },
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
                                                        fontSize: { md: "16px", xs: "14px" },
                                                        lineHeight: { md: '30px', xs: '32px' },
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
                                    <Typography
                                        sx={{
                                            color: "#FFFFFF",
                                            fontSize: "18px",
                                            textTransform: "none",
                                            fontWeight: "400",
                                            padding: "1px 20px",
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => { setReadMore(false) }}
                                    >
                                        {`Show Less <<`}
                                    </Typography>
                                </Box>
                            </> :
                            <Box
                                sx={{
                                    paddingTop: '50px',
                                    display: 'flex',
                                    justifyContent: 'start',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                        fontSize: "18px",
                                        textTransform: "none",
                                        fontWeight: "400",
                                        padding: "1px 20px",
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => { setReadMore(true) }}
                                >
                                    {`Show More >>`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: { md: 'end', xs: 'center' },
                            paddingTop: '50px',
                            gap: { md: '200px', xs: '50px' }
                        }}
                    >
                        <Box
                            sx={{
                                width: { md: '50%', xs: '100%' },
                                display: 'flex'
                            }}
                        >
                            <Button
                                onMouseOver={() => { if (!(ethBalanceValue > 0 || usdebtBalanceValue > 0)) setShowSigningToken(true) }}
                                onMouseOut={() => { if (!(ethBalanceValue > 0 || usdebtBalanceValue > 0)) setShowSigningToken(false) }}
                                onClick={(e) => { if (ethBalanceValue > 0 || usdebtBalanceValue > 0) onSignPetition() }}
                                sx={{
                                    position: 'relative',
                                    width: { md: '45%', xs: '100%' },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: 0,
                                    paddingBottom: '20px',
                                    ':hover': { background: 'transparent' },
                                    ':disabled': { opacity: '30%' }
                                }}
                                disabled={isSigned}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        minHeight: '50px',
                                        backgroundColor: '#000',
                                        color: "#fff",
                                        lineHeight: "32px",
                                        textAlign: "center",
                                        border: "2px solid #7df9ff",
                                        borderRadius: "8px",
                                        padding: "8px 0px",
                                        boxShadow: "0px 2px 8px rgba(0,0,0,0.16)",
                                        ":hover": { background: "#111111" },
                                        ":disabled": { color: "#ffffff70", background: "#111111" },
                                        outline: "none",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        alignItems: 'center',
                                        img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' }
                                    }}
                                >
                                    {ethBalanceValue > 0 || usdebtBalanceValue > 0 ?
                                        <>
                                            <img src="/P3WebAppLogo.png" alt="chainLogo" />
                                            <Typography
                                                sx={{
                                                    fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                    fontWeight: '500',
                                                    textTransform: "none",
                                                    letterSpacing: '0px',
                                                }}
                                            >{isSigned ? "YOU HAVE SIGNED" : "SIGN"}</Typography>
                                        </> :
                                        <Typography
                                            sx={{
                                                fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                fontWeight: '500',
                                                textTransform: "none",
                                                letterSpacing: '0px',
                                            }}
                                        >BUY AWARENESS TOKEN</Typography>
                                    }
                                </Box>
                                {showSigningToken ?
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: '-90px',
                                            left: 0,
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid #888888',
                                            background: '#000000',
                                            zIndex: 1,
                                            a: { width: '30px', height: '30px' },
                                            img: { width: '100%', height: '100%', objectFit: 'contain' },
                                        }}
                                    >
                                        <a href="https://app.uniswap.org/#/swap?&chain=mainnet&use=v2&outputCurrency=0x00c5ca160a968f47e7272a0cfcda36428f386cb6"><img src="/usdebt.png" alt="" /></a>
                                        <Box
                                            sx={{
                                                height: '2px',
                                                width: '100%',
                                                background: '#333333'
                                            }}
                                        ></Box>
                                        {/* <a href="https://baseswap.fi/basicswap"><img src="/eth.png" alt="" /></a> */}
                                        <Typography
                                            sx={{
                                                fontSize: { xl: "16px", lg: '16px', md: '14px', xl: '16px' },
                                                fontWeight: '500',
                                                textTransform: "none",
                                                letterSpacing: '0px',
                                            }}
                                        >LEARN MORE</Typography>
                                    </Box> :
                                    <></>
                                }
                            </Button>
                        </Box>
                    </Box>
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
                            onClick={(e) => setSelectedTab("signers")}
                            sx={{
                                height: '40px',
                                background: 'transparent',
                                color: `${selectedTab == "signers" ? "#ffffff" : "#FFFFFF"}`,
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",
                                fontSize: { md: "20px", xs: '16px' },
                                fontWeight: '500',
                                padding: { md: "5px 20px", xs: '5px' },
                                textShadow: `${selectedTab == "signers" ? "0px 0px 5px #7DF9FF" : ""}`
                            }}
                        >
                            Signers
                        </Button>
                        <Button
                            onClick={(e) => setSelectedTab("comments")}
                            sx={{
                                height: '40px',
                                background: 'transparent',
                                color: `${selectedTab == "comments" ? "#ffffff" : "#FFFFFF"}`,
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",
                                fontSize: { md: "20px", xs: '16px' },
                                fontWeight: '500',
                                padding: { md: "5px 20px", xs: '5px' },
                                textShadow: `${selectedTab == "comments" ? "0px 0px 5px #7DF9FF" : ""}`
                            }}
                        >
                            Comments
                        </Button>
                    </Box>
                    {selectedTab == "signers" ?
                        <>
                            <SignerTable
                                tableItems={usdebtSignersInfo}
                                isUsdebtSigners={true}
                            />
                            <SignerTable
                                tableItems={ethSignersInfo}
                                isUsdebtSigners={false}
                            />
                        </> :
                        <CommentTable
                            tableItems={comments}
                        />
                    }
                </Container >
            </Box >
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
                            width: { md: '35%', xs: '90%' },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
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
                                textAlign: "center",
                                fontSize: { md: "24px", xs: "20px" },
                                fontWeight: '500',
                                color: "#FFFFFF",
                            }}
                        >
                            Share Your Crypto Petition
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: { md: "18px", xs: "16px" },
                                color: "#FFFFFF",
                            }}
                        >
                            Spread awareness about the U.S. National Debt Crisis and earn points to qualify for <i>Quill0x Airdrops</i>.
                        </Typography>
                        <Button
                            sx={{
                                background: "#00000030",
                                color: "#FFFFFF",
                                fontSize: { md: "16px", xs: "14px" },
                                textTransform: "none",
                                border: 'solid 2px #7DF9FF',
                                borderRadius: "8px",
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                fontFamily: 'RobotoMonoFont!important'
                            }}
                            onClick={(e) => { }}
                        >
                            <ContentCopy sx={{ fontSize: '20px' }} />
                            <b>COPY (CLIPBOARD)</b>
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { md: 'row', xs: 'column' },
                                justifyContent: { md: 'space-between', xs: 'start' },
                                gap: '10px'
                            }}
                        >
                            <Box
                                sx={{
                                    width: { md: "32%", xs: "100%" },
                                    background: "#00000030",
                                    border: 'solid 2px #7DF9FF',
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    button: { width: '100%', height: '100%' },
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <Button
                                    onClick={(e) => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.quill0x.com')}&quote=${encodeURIComponent(`The U.S. National Debt Crypto Petition is a new type of petition supercharged by USDEBT, the U.S. National Debt meme coin, and ETH, the native asset of Ethereum.\n\nSign the U.S. National Debt Crypto Petition today and join the growing Capital Quill0x community.\n\nEnter my referral code: ${referralCode} to qualify for future airdrops!`)}`, '_blank'); }}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        color: "#FFFFFF",
                                        fontSize: { md: "16px", xs: "14px" },
                                        textTransform: "none",
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '5px',
                                        img: { width: '24px', height: '24px' }
                                    }}
                                >
                                    {/* <FacebookIcon size={24} round /> */}
                                    <img src={DarkFacebook} alt="facebook_link" />
                                    <b>Facebook</b>
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: { md: "32%", xs: "100%" },
                                    background: "#00000030",
                                    border: 'solid 2px #7DF9FF',
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    button: { width: '100%', height: '100%' },
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <Button
                                    onClick={(e) => { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://www.quill0x.com')}&text=${encodeURIComponent(`The U.S. National Debt Crypto Petition is a new type of petition supercharged by USDEBT, the U.S. National Debt meme coin, and ETH, the native asset of Ethereum.\n\nSign the U.S. National Debt Crypto Petition today and join the growing Capital Quill0x community.\n\nEnter my referral code: ${referralCode} to qualify for future airdrops!`)}`, '_blank'); }}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        color: "#FFFFFF",
                                        fontSize: { md: "16px", xs: "14px" },
                                        textTransform: "none",
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '5px',
                                        img: { width: '24px', height: '24px' }
                                    }}
                                >
                                    {/* <TwitterIcon size={24} round /> */}
                                    <img src={DarkX} alt="twitter_link" />
                                    <b>Post on X</b>
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    width: { md: "32%", xs: "100%" },
                                    background: "#00000030",
                                    border: 'solid 2px #7DF9FF',
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    button: { width: '100%', height: '100%' },
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <Button
                                    onClick={(e) => { window.open(`mailto:?subject=${encodeURIComponent('Sign the U.S. National Debt Crypto Petition!')}&body=$${encodeURIComponent(`The U.S. National Debt Crypto Petition is a new type of petition supercharged by USDEBT, the U.S. National Debt meme coin, and ETH, the native asset of Ethereum.\n\nSign the U.S. National Debt Crypto Petition today and join the growing Capital Quill0x community.\n\nEnter my referral code: ${referralCode} to qualify for future airdrops!`)}`, '_blank'); }}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        color: "#FFFFFF",
                                        fontSize: { md: "16px", xs: "14px" },
                                        textTransform: "none",
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    <EmailIcon size={24} round />
                                    <b>Email</b>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box > :
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
                            backgroundColor: '#1E1E1E',
                            borderRadius: '8px',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
                            padding: '20px',
                            border: '2px solid #7DF9FF',
                            width: { md: '35%', xs: '90%' },
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
                                    fontSize: "24px",
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
                                maxHeight: '80vh',
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
                                                    fontSize: "18px",
                                                    fontWeight: '500',
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {petition_to.split(" (")[0]}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
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
            {showCommentExplanation ?
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
                            onClick={(e) => setShowCommentExplanation(false)}
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
                            About Comment
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "16px",
                                color: "#FFFFFF",
                            }}
                        >
                            Spread awareness on the U. S. National Crisis by sharing the petition in as many places as possible.
                        </Typography>
                    </Box>
                </Box > :
                <></>}
            {showContractInfo ?
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
                            width: { md: '30%', xs: '90%' },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <Close
                            onClick={(e) => setShowContractInfo("")}
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
                            {showContractInfo} Contract
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: { md: "16px", xs: "12px" },
                                color: "#FFFFFF",
                            }}
                        >
                            {showContractInfo == "Ethereum" ? petitionAddress : (showContractInfo == "Base" ? petitionAddressBase : "")}
                        </Typography>
                    </Box>
                </Box > :
                <></>}
            {showEthSigning ?
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
                            You are signing as ETH holder. Continue?
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
                                    onClick={() => { setShowEthSigning(false); setIsLoading(true); signMessage(); }}
                                >
                                    YES
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
                                    onClick={() => { setShowEthSigning(false); }}
                                >
                                    NO
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box> :
                <></>
            }
            {isExploding &&
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                    }}
                >
                    <ConfettiExplosion

                        colors={["#00ffff", "#008080", "#00ced1"]}
                    />
                </Box>
            }
            {isLoading &&
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
                        img: {
                            width: "100%",
                            height: "100%",
                            objectFit: 'contain',
                        }
                    }}
                >
                    <RotatingElement><img  src="petitions3.png" alt="loading logo" /></RotatingElement>
                </Box>
            }
        </>
    );
};
export default Home;
