import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination
} from "@mui/material";

import moment from 'moment';

const chainLogo = {
  0: "https://chainlist.org/unknown-logo.png",
  1: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
  8453: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
}

const TokenBalance = ({ balance, tokenIconUrl }) => {
  return (
    <Box
      gap={"10px"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "end",
        img: {
          width: { md: "32px", xs: "20px" },
          height: { md: "32px", xs: "20px" },
        },
      }}
    >
      <Typography>{Intl.NumberFormat("en-US").format(balance)}</Typography>
      <img alt="" src={tokenIconUrl} />
    </Box>
  );
};

const SignerTable = ({ tableItems, isUsdebtSigners }) => {

  const [page, setPage] = useState(1);

  useEffect(() => {
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <TableContainer
        sx={{
          display: { md: "flex", xs: "none" },
        }}
      >
        <Table sx={{ borderBottom: "1px solid #333333" }}>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "1px solid #333333",
                ".MuiTableCell-root": {
                  fontSize: { md: "18px", xs: "12px" },
                  color: "#ffffff",
                  fontWeight: "500",
                  border: "0px",
                  textShadow: "0px 0px 5px #7DF9FF"
                },
              }}
            >
              {isUsdebtSigners ?
                <>
                  <TableCell sx={{ position: 'sticky', left: 0, background: '#0A0A0A' }} align="left">WalletAddress</TableCell>
                  <TableCell align="center">Chain</TableCell>
                  <TableCell sx={{ minWidth: '200px' }} align="right">USDEBT Held</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">TX</TableCell>
                </> :
                <>
                  <TableCell sx={{ position: 'sticky', left: 0, background: '#0A0A0A' }} align="left">WalletAddress</TableCell>
                  <TableCell align="center">Chain</TableCell>
                  <TableCell sx={{ minWidth: '200px' }} align="right"></TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">TX</TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tableItems?.length > 0 &&
              tableItems.map((item, index) => (
                index >= (page - 1) * 20 && index < page * 20 &&
                <TableRow
                  key={index}
                  sx={{
                    ".MuiTableCell-root": {
                      fontSize: { md: "16px", xs: "12px" },
                      color: "#808080",
                      border: "0px",
                      borderBottom: "1px dashed #808080",
                    },
                    ".MuiTypography-root": {
                      fontSize: { md: "16px", xs: "12px" },
                    },
                  }}
                >
                  <TableCell sx={{ position: 'sticky', left: 0, background: '#0A0A0A' }} align="left">{item.signerAddress.substring(0, 4) + "..." + item.signerAddress.substring(item.signerAddress.length - 4)}</TableCell>
                  <TableCell sx={{ img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' } }} align="center"><img src={chainLogo[item.chainId] ? chainLogo[item.chainId] : chainLogo[0]} alt="chainLogo" /></TableCell>
                  {isUsdebtSigners ?
                    <TableCell sx={{ minWidth: '200px' }} align="right">
                      <TokenBalance
                        balance={item.usdebtBalance}
                        tokenIconUrl={"./usdebt.png"}
                      />
                    </TableCell> :
                    <TableCell sx={{ minWidth: '200px' }} align="right">
                    </TableCell>
                  }
                  <TableCell align="right">{moment.unix(item.time).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                  <TableCell align="right">{item.transactionHash}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        sx={{
          display: { md: "none", xs: "flex" },
        }}
      >
        <Table sx={{ borderBottom: "1px solid #333333" }}>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "1px solid #333333",
                ".MuiTableCell-root": {
                  fontSize: { md: "18px", xs: "12px" },
                  color: "#ffffff",
                  fontWeight: "500",
                  border: "0px",
                  textShadow: "0px 0px 5px #7DF9FF"
                },
              }}
            >
              {isUsdebtSigners ?
                <>
                  <TableCell sx={{ whiteSpace: 'pre-wrap', position: 'sticky', left: 0, background: '#0A0A0A' }} align="left">WalletAddress</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="center">Chain</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap', minWidth: '200px' }} align="right">USDEBT Held</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="right">Time</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="right">TX</TableCell>
                </> :
                <>
                  <TableCell sx={{ whiteSpace: 'pre-wrap', position: 'sticky', left: 0, background: '#0A0A0A' }} align="left">WalletAddress</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="center">Chain</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap', minWidth: '200px' }} align="right"></TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="right">Time</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="right">TX</TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tableItems?.length > 0 &&
              tableItems.map((item, index) => (
                index >= (page - 1) * 10 && index < page * 10 &&
                <TableRow
                  key={index}
                  sx={{
                    ".MuiTableCell-root": {
                      fontSize: { md: "16px", xs: "12px" },
                      color: "#808080",
                      border: "0px",
                      borderBottom: "1px dashed #808080",
                    },
                    ".MuiTypography-root": {
                      fontSize: { md: "16px", xs: "12px" },
                    },
                  }}
                >
                  <TableCell sx={{ whiteSpace: 'pre-wrap', position: 'sticky', left: 0, background: '#0A0A0A' }} align="left">{item.signerAddress.substring(0, 4) + "..." + item.signerAddress.substring(item.signerAddress.length - 4)}</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap', img: { width: '30px', height: '30px', objectFit: 'contain', borderRadius: '100%' } }} align="center"><img src={chainLogo[item.chainId] ? chainLogo[item.chainId] : chainLogo[0]} alt="chainLogo" /></TableCell>
                  {isUsdebtSigners ?
                    <TableCell sx={{ whiteSpace: 'pre-wrap', minWidth: '200px' }} align="right">
                      <TokenBalance
                        balance={item.usdebtBalance}
                        tokenIconUrl={"./usdebt.png"}
                      />
                    </TableCell> :
                    <TableCell sx={{ whiteSpace: 'pre-wrap', minWidth: '200px' }} align="right">
                    </TableCell>
                  }
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="right">{moment.unix(item.time).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                  <TableCell sx={{ whiteSpace: 'pre-wrap' }} align="right">{item.transactionHash}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end'
        }}
      >
        <Pagination onChange={(e, v) => { console.log(v); setPage(v) }} varaiant="outlined" page={page} siblingCount={2} boundaryCount={1} count={Math.ceil(tableItems.length / 20)}
          sx={{
            display: { md: 'block', xs: 'none' },
            ul: {
              '& .MuiPaginationItem-root': {
                color: "white", "&.Mui-selected": { backgroundColor: "#ffffff", color: "#000" },
                ":hover": { backgroundColor: "#ffffff", color: "#000" }
              }
            }
          }}
        />
        <Pagination onChange={(e, v) => { console.log(v); setPage(v) }} varaiant="outlined" page={page} siblingCount={2} boundaryCount={1} count={Math.ceil(tableItems.length / 10)}
          sx={{
            display: { md: 'none', xs: 'block' },
            ul: { '& .MuiPaginationItem-root': { color: "white", "&.Mui-selected": { backgroundColor: "#ffffff", color: "#000" }, ":hover": { backgroundColor: "#ffffff", color: "#000" } } }
          }}
        />
      </Box>
    </Box>
  );
};

export default SignerTable;