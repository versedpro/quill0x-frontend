import BannerVideo from "../assets/default-banner.mp4";
import SignerTable from "../components/signer-table";
import { Box, Container, Typography } from "@mui/material";

const Home = () => {

    return (
        <Container
            sx={{
                paddingTop: "80px",
                paddingBottom: "50px",
                '.MuiTypography-root': {
                    fontFamily: "UsdebtFont"
                }
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
                <video src={BannerVideo} loop autoPlay />
                <Box
                    sx={{
                        marginTop: "16px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { md: "28px", sm: "24px", xs: "20px" },
                            color: "#FFFFFF",
                            fontStyle: "italic",
                        }}
                    >
                        A Call to Crypto Action:
                    </Typography>
                    <Box
                        sx={{
                            ".MuiTypography-root": {
                                fontSize: { md: "54px", sm: "48px", xs: "36px" },
                                color: "#D32F28",
                                fontWeight: "700",
                                lineHeight: { md: "58px", sm: "52px", xs: "40px" },
                            },
                        }}
                    >
                        <Typography>DECENTRALIZATION</Typography>
                        <Typography>AGAINST</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Typography>RISING</Typography>
                            <Typography
                                sx={{
                                    marginLeft: "10px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    background: "#213967",
                                    color: "#000000 !important",
                                    fontWeight: "900 !important",
                                }}
                            >
                                U.S.DEBT
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography
                    sx={{
                        textAlign: "justify",
                        marginTop: "20px",
                        fontSize: { md: "18px", sm: "16px", md: "14px" },
                        color: "#FFFFFF",
                    }}
                >
                    <i>
                    John F. Kennedy's 1961 call to action "Ask not what your country can
                    do for you, ask what you can do for your country" resonates today
                    with the soaring global national debt and economic uncertainty. The
                    centralized U.S. government has failed to curb this escalating
                    economic crisis by letting short term political goals lead to the
                    devaluation of the U.S. dollar and skyrocketing inflation.
                    Fortunately, new technology enables a shift in perspective that can
                    help solve the seemingly impossible to solve problem. 33.1 trillion
                    dollars, accelerating to an unsustainable pace of 15.5% annual rate.
                    USDEBT token, minted with a fixed supply, is the first economic and
                    social awareness token that shines a bright spotlight on the
                    unchecked rise of the national debt. This paves the path to a
                    solution based on cryptocurrencies. This isn't about capitalizing on
                    market volatility. It's about empowering people to embrace a
                    transformative economic force - decentralization - to help solve the
                    debt crisis.</i>
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop: "30px",
                }}
            >
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
                    ]}
                />
            </Box>
        </Container>
    );
};
export default Home;
