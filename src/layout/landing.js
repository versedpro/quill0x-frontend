
import { useNavigate } from "react-router-dom";

import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import Carousel from 'react-material-ui-carousel';
import ReactPlayer from 'react-player';

const Landing = () => {

    const navigate = useNavigate();

    return (
        <>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}>
                {/* <Box
                    sx={{
                        position: 'fixed',
                        width: "100%",
                        height: '100%',
                        paddingRight: { md: "100px", xs: "10px" },
                        paddingLeft: { md: "100px", xs: "10px" },
                        zIndex: -1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <ReactPlayer url="/bg.mov" playing loop muted width='auto'
                        height='auto'
                        fileConfig={{
                            attributes: {
                                style: {
                                    display: 'block',
                                    width: 'auto',
                                    height: 'auto'
                                }
                            }
                        }} />
                </Box> */}
                <Container
                    sx={{
                        minHeight: '100vh',
                        position: 'relative',
                        maxWidth: "1600px!important",
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
                        gap: '50px',
                        // backgroundImage: "url('/bg.gif')",
                        // backgroundRepeat: 'no-repeat',
                        // backgroundSize: 'cover'
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "80px",
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            sx={{
                                padding: '100px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontSize: { md: '40px', xs: '24px' },
                                    fontWeight: '900',
                                    textAlign: 'center'
                                }}
                            >
                                Advocacy doesn't need to be boring.
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontSize: { md: '40px', xs: '24px' },
                                    fontWeight: '900',
                                    textAlign: 'center'
                                }}
                            >
                                Let's build crypto's next great sector together.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontSize: { md: '30px', xs: '24px' },
                                fontWeight: '700',
                                textAlign: 'center'
                            }}
                        >
                            Awareness Tokens
                        </Typography>
                        <Carousel
                            sx={{
                                display: { md: 'block', xs: 'none' },
                                width: '100%'
                            }}
                            interval={10000}
                            duration={1000}
                            navButtonsProps={{
                                style: {
                                    backgroundColor: 'none',
                                    borderRadius: 0
                                }
                            }}
                            navButtonsWrapperProps={{
                                style: {
                                    top: '40%'
                                }
                            }}
                            NavButton={({ onClick, className, style, next, prev }) => {
                                return (
                                    <>
                                        {next && <ArrowCircleRight sx={{ cursor: 'pointer', color: '#efefef' }} onClick={onClick} />}
                                        {prev && <ArrowCircleLeft sx={{ cursor: 'pointer', color: '#efefef' }} onClick={onClick} />}
                                    </>
                                )
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    gap: '20px',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { md: '30%', xs: '100%' },
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        border: 'solid 1px #333333',
                                        backgroundImage: 'url(./UncleSam.png)',
                                        backgroundPosition: 'top center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <Button
                                        onClick={(e) => { navigate("/home") }}
                                        sx={{
                                            marginTop: '50px',
                                            height: '60px',
                                            width: '300px',
                                            // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                            backgroundColor: '#ffffff50',
                                            backdropFilter: 'blur(10px)',
                                            color: "#fff",
                                            fontSize: "20px",
                                            fontWeight: '500',
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            border: 'solid 1px #ffffff',
                                            padding: "5px 30px",
                                            boxShadow: 3,
                                            ":hover": { background: "#ffffff70" },
                                            ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                        }}
                                    >
                                        Sign Petition
                                    </Button>
                                    <Box
                                        sx={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '30px',
                                            img: { width: '30px', height: '30px', objectFit: 'contain' }
                                        }}
                                    >
                                        <img alt="" src={"./usdebt.png"} />
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Price: $1
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Total Supply: 20T
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: '30%', xs: '100%' },
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        border: 'solid 1px #333333',
                                        // backgroundImage: 'url(./UncleSam.png)',
                                        backgroundPosition: 'top center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <Button
                                        onClick={(e) => {  /*navigate("/home")*/ }}
                                        sx={{
                                            marginTop: '50px',
                                            height: '60px',
                                            width: '300px',
                                            // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                            backgroundColor: '#ffffff50',
                                            backdropFilter: 'blur(10px)',
                                            color: "#fff",
                                            fontSize: "20px",
                                            fontWeight: '500',
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            border: 'solid 1px #ffffff',
                                            padding: "5px 30px",
                                            boxShadow: 3,
                                            ":hover": { background: "#ffffff70" },
                                            ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                        }}
                                    >
                                        Earn - Phase 2
                                    </Button>
                                    <Box
                                        sx={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '30px',
                                            img: { width: '30px', height: '30px', objectFit: 'contain' }
                                        }}
                                    >
                                        <Box sx={{ height: "30px" }}></Box>
                                        {/* <img alt="" src={"./logo1921.png"} />
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Price: $1
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Total Supply: 20T
                                        </Typography> */}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: '30%', xs: '100%' },
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        border: 'solid 1px #333333',
                                        // backgroundImage: 'url(./UncleSam.png)',
                                        backgroundPosition: 'top center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <Button
                                        onClick={(e) => {  /*navigate("/home")*/ }}
                                        sx={{
                                            marginTop: '50px',
                                            height: '60px',
                                            width: '300px',
                                            // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                            backgroundColor: '#ffffff50',
                                            backdropFilter: 'blur(10px)',
                                            color: "#fff",
                                            fontSize: "20px",
                                            fontWeight: '500',
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            border: 'solid 1px #ffffff',
                                            padding: "5px 30px",
                                            boxShadow: 3,
                                            ":hover": { background: "#ffffff70" },
                                            ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                        }}
                                    >
                                        Earn - Phase 3
                                    </Button>
                                    <Box
                                        sx={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '30px',
                                            img: { width: '30px', height: '30px', objectFit: 'contain' }
                                        }}
                                    >
                                        <Box sx={{ height: "30px" }}></Box>
                                        {/* <img alt="" src={"./logo1921.png"} />
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Price: $1
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Total Supply: 20T
                                        </Typography> */}
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    gap: '20px',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { md: '30%', xs: '100%' },
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        border: 'solid 1px #333333',
                                        // backgroundImage: 'url(./UncleSam.png)',
                                        backgroundPosition: 'top center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <Button
                                        onClick={(e) => {  /*navigate("/home")*/ }}
                                        sx={{
                                            marginTop: '50px',
                                            height: '60px',
                                            width: '300px',
                                            // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                            backgroundColor: '#ffffff50',
                                            backdropFilter: 'blur(10px)',
                                            color: "#fff",
                                            fontSize: "20px",
                                            fontWeight: '500',
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            border: 'solid 1px #ffffff',
                                            padding: "5px 30px",
                                            boxShadow: 3,
                                            ":hover": { background: "#ffffff70" },
                                            ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                        }}
                                    >
                                        Earn - Phase 4
                                    </Button>
                                    <Box
                                        sx={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '30px',
                                            img: { width: '30px', height: '30px', objectFit: 'contain' }
                                        }}
                                    >
                                        <Box sx={{ height: "30px" }}></Box>
                                        {/* <img alt="" src={"./logo1921.png"} />
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Price: $2
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Total Supply: 40T
                                        </Typography> */}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: '30%', xs: '100%' },
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        border: 'solid 1px #333333',
                                        // backgroundImage: 'url(./UncleSam.png)',
                                        backgroundPosition: 'top center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <Button
                                        onClick={(e) => {  /*navigate("/home")*/ }}
                                        sx={{
                                            marginTop: '50px',
                                            height: '60px',
                                            width: '300px',
                                            // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                            backgroundColor: '#ffffff50',
                                            backdropFilter: 'blur(10px)',
                                            color: "#fff",
                                            fontSize: "20px",
                                            fontWeight: '500',
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            border: 'solid 1px #ffffff',
                                            padding: "5px 30px",
                                            boxShadow: 3,
                                            ":hover": { background: "#ffffff70" },
                                            ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                        }}
                                    >
                                        Earn - Phase 5
                                    </Button>
                                    <Box
                                        sx={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '30px',
                                            img: { width: '30px', height: '30px', objectFit: 'contain' }
                                        }}
                                    >
                                        <Box sx={{ height: "30px" }}></Box>
                                        {/* <img alt="" src={"./logo1921.png"} />
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Price: $3
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Total Supply: 50T
                                        </Typography> */}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: { md: '30%', xs: '100%' },
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        border: 'solid 1px #333333',
                                        // backgroundImage: 'url(./UncleSam.png)',
                                        backgroundPosition: 'top center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <Button
                                        onClick={(e) => {  /*navigate("/home")*/ }}
                                        sx={{
                                            marginTop: '50px',
                                            height: '60px',
                                            width: '300px',
                                            // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                            backgroundColor: '#ffffff50',
                                            backdropFilter: 'blur(10px)',
                                            color: "#fff",
                                            fontSize: "20px",
                                            fontWeight: '500',
                                            textTransform: "none",
                                            borderRadius: "20px",
                                            border: 'solid 1px #ffffff',
                                            padding: "5px 30px",
                                            boxShadow: 3,
                                            ":hover": { background: "#ffffff70" },
                                            ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                        }}
                                    >
                                        Earn - Phase 6
                                    </Button>
                                    <Box
                                        sx={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '30px',
                                            img: { width: '30px', height: '30px', objectFit: 'contain' }
                                        }}
                                    >
                                        <Box sx={{ height: "30px" }}></Box>
                                        {/* <img alt="" src={"./logo1921.png"} />
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Price: $5
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                            }}
                                        >
                                            Total Supply: 60T
                                        </Typography> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Carousel>
                        <Carousel
                            sx={{
                                display: { md: 'none', xs: 'block' },
                                width: '100%'
                            }}
                            interval={10000}
                            duration={1000}
                            navButtonsProps={{
                                style: {
                                    backgroundColor: 'none',
                                    borderRadius: 0
                                }
                            }}
                            navButtonsWrapperProps={{
                                style: {
                                    top: '40%'
                                }
                            }}
                            NavButton={({ onClick, className, style, next, prev }) => {
                                return (
                                    <>
                                        {next && <ArrowCircleRight sx={{ cursor: 'pointer', color: '#efefef' }} onClick={onClick} />}
                                        {prev && <ArrowCircleLeft sx={{ cursor: 'pointer', color: '#efefef' }} onClick={onClick} />}
                                    </>
                                )
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: 'solid 1px #333333',
                                    backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Button
                                    onClick={(e) => { navigate("/home") }}
                                    sx={{
                                        marginTop: '50px',
                                        height: '60px',
                                        width: '300px',
                                        // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        backgroundColor: '#ffffff50',
                                        backdropFilter: 'blur(10px)',
                                        color: "#fff",
                                        fontSize: "20px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: 'solid 1px #ffffff',
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#ffffff70" },
                                        ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                    }}
                                >
                                    Sign Petition
                                </Button>
                                <Box
                                    sx={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '30px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <img alt="" src={"./usdebt.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Price: $1
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Total Supply: 20T
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: 'solid 1px #333333',
                                    // backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Button
                                    onClick={(e) => {  /*navigate("/home")*/ }}
                                    sx={{
                                        marginTop: '50px',
                                        height: '60px',
                                        width: '300px',
                                        // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        backgroundColor: '#ffffff50',
                                        backdropFilter: 'blur(10px)',
                                        color: "#fff",
                                        fontSize: "20px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: 'solid 1px #ffffff',
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#ffffff70" },
                                        ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                    }}
                                >
                                    Earn - Phase 2
                                </Button>
                                <Box
                                    sx={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '30px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <Box sx={{ height: "30px" }}></Box>
                                    {/* <img alt="" src={"./logo1921.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Price: $1
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Total Supply: 20T
                                    </Typography> */}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: 'solid 1px #333333',
                                    // backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Button
                                    onClick={(e) => {  /*navigate("/home")*/ }}
                                    sx={{
                                        marginTop: '50px',
                                        height: '60px',
                                        width: '300px',
                                        // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        backgroundColor: '#ffffff50',
                                        backdropFilter: 'blur(10px)',
                                        color: "#fff",
                                        fontSize: "20px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: 'solid 1px #ffffff',
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#ffffff70" },
                                        ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                    }}
                                >
                                    Earn - Phase 3
                                </Button>
                                <Box
                                    sx={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '30px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <Box sx={{ height: "30px" }}></Box>
                                    {/* <img alt="" src={"./logo1921.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Price: $1
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Total Supply: 20T
                                    </Typography> */}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: 'solid 1px #333333',
                                    // backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Button
                                    onClick={(e) => {  /*navigate("/home")*/ }}
                                    sx={{
                                        marginTop: '50px',
                                        height: '60px',
                                        width: '300px',
                                        // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        backgroundColor: '#ffffff50',
                                        backdropFilter: 'blur(10px)',
                                        color: "#fff",
                                        fontSize: "20px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: 'solid 1px #ffffff',
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#ffffff70" },
                                        ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                    }}
                                >
                                    Earn - Phase 4
                                </Button>
                                <Box
                                    sx={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '30px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <Box sx={{ height: "30px" }}></Box>
                                    {/* <img alt="" src={"./logo1921.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Price: $2
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Total Supply: 40T
                                    </Typography> */}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: 'solid 1px #333333',
                                    // backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Button
                                    onClick={(e) => {  /*navigate("/home")*/ }}
                                    sx={{
                                        marginTop: '50px',
                                        height: '60px',
                                        width: '300px',
                                        // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        backgroundColor: '#ffffff50',
                                        backdropFilter: 'blur(10px)',
                                        color: "#fff",
                                        fontSize: "20px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: 'solid 1px #ffffff',
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#ffffff70" },
                                        ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                    }}
                                >
                                    Earn - Phase 5
                                </Button>
                                <Box
                                    sx={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '30px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <Box sx={{ height: "30px" }}></Box>
                                    {/* <img alt="" src={"./logo1921.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Price: $3
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Total Supply: 50T
                                    </Typography> */}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: 'solid 1px #333333',
                                    // backgroundImage: 'url(./UncleSam.png)',
                                    backgroundPosition: 'top center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Button
                                    onClick={(e) => {  /*navigate("/home")*/ }}
                                    sx={{
                                        marginTop: '50px',
                                        height: '60px',
                                        width: '300px',
                                        // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                        backgroundColor: '#ffffff50',
                                        backdropFilter: 'blur(10px)',
                                        color: "#fff",
                                        fontSize: "20px",
                                        fontWeight: '500',
                                        textTransform: "none",
                                        borderRadius: "20px",
                                        border: 'solid 1px #ffffff',
                                        padding: "5px 30px",
                                        boxShadow: 3,
                                        ":hover": { background: "#ffffff70" },
                                        ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                                    }}
                                >
                                    Earn - Phase 6
                                </Button>
                                <Box
                                    sx={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '30px',
                                        img: { width: '30px', height: '30px', objectFit: 'contain' }
                                    }}
                                >
                                    <Box sx={{ height: "30px" }}></Box>
                                    {/* <img alt="" src={"./logo1921.png"} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Price: $5
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textshadow: "1px -1px 2px rgba(150, 150, 150, 0.5)"
                                        }}
                                    >
                                        Total Supply: 60T
                                    </Typography> */}
                                </Box>
                            </Box>
                        </Carousel>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            onClick={(e) => { navigate("/leaderboard") }}
                            sx={{
                                height: '80px',
                                width: { md: '400px', xs: '100%' },
                                // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                backgroundColor: '#ffffff',
                                color: "#000",
                                fontSize: "27px",
                                fontWeight: '500',
                                textTransform: "none",
                                borderRadius: "20px",
                                padding: "5px 30px",
                                boxShadow: 3,
                                ":hover": { background: "#5CD7DD" },
                                ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                            }}
                        >
                            Leaderboard
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            height: '600px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
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
                            How Petition3 Works
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingBottom: "200px",
                        }}
                    >
                        <Button
                            onClick={(e) => { }}
                            sx={{
                                height: '80px',
                                width: { md: '500px', xs: '100%' },
                                // background: 'linear-gradient(to bottom, #11203E, #314E85)',
                                backgroundColor: '#ffffff',
                                color: "#000",
                                fontSize: { md: "27px", xs: '20px' },
                                fontWeight: '500',
                                textTransform: "none",
                                borderRadius: "20px",
                                padding: "5px 30px",
                                boxShadow: 3,
                                ":hover": { background: "#5CD7DD" },
                                ":disabled": { color: "#ffffff70", background: "#ffffff70" }
                            }}
                        >
                            Earn IMPACT tokens
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: -1,
                            img: { width: '100%', height: '100%', objectFit: 'cover' }
                        }}
                    >
                        <img src="/bg.gif" alt="bg" />
                    </Box>
                </Container>
                {/* <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        img: { width: '100%', height: '100%', objectFit: 'cover' }
                    }}
                >
                    <img src="/bg.gif" alt="bg" />
                </Box> */}
            </Box>
        </>
    );
};
export default Landing;
