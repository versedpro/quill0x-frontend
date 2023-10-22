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
          width: "32px",
          height: "32px",
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
                  fontSize: "18px",
                  color: "#ffffff",
                  fontWeight: "500",
                  border: "0px",
                  textShadow: "2px -2px 4px rgba(126, 249, 255, 0.5)"
                },
              }}
            >
              {isUsdebtSigners ?
                <>
                  <TableCell align="left">USDEBT</TableCell>
                  <TableCell align="right">USDEBT Held</TableCell>
                </> :
                <>
                  <TableCell align="left">ETH</TableCell>
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
                      fontSize: "16px",
                      color: "#808080",
                      border: "0px",
                      borderBottom: "1px dashed #808080",
                    },
                    ".MuiTypography-root": {
                      fontSize: "16px",
                    },
                  }}
                >
                  <TableCell align="left">{item.signerAddress}</TableCell>
                  {isUsdebtSigners ?
                    <TableCell align="right">
                      <TokenBalance
                        balance={item.usdebtBalance}
                        tokenIconUrl={"./logo192.png"}
                      />
                    </TableCell> :
                    <></>
                  }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        gap={"10px"}
        sx={{
          display: { md: "none", xs: "flex" },
          flexDirection: "column",
          // maxWidth: "540px",
        }}
      >
        {tableItems?.length > 0 &&
          tableItems.map((item, index) => (
            index >= (page - 1) * 10 && index < page * 10 &&
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #808080",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "42px",
                  padding: "0 20px",
                  background: "#808080",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: "18px", xs: "16px" },
                    color: "#00000",
                    fontWeight: "500",
                  }}
                >
                  {item.signerAddress}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "54px",
                  padding: "0 20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ".MuiTypography-root": {
                    fontSize: "16px",
                    color: "#808080",
                  },
                }}
              >
                <Box>
                  <TokenBalance
                    balance={item.usdebtBalance}
                    tokenIconUrl={"./logo192.png"}
                  />
                </Box>
                <Box
                  sx={{ width: "1px", height: "24px", background: "#808080" }}
                />
                <Box>
                  <TokenBalance
                    balance={item.ethBalance}
                    tokenIconUrl={
                      "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
                    }
                  />
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
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