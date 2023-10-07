import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const TokenBalance = ({ balance, tokenIconUrl }) => {
  return (
    <Box
      gap={"10px"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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

const SignerTable = ({ tableItems }) => {
  return (
    <Box>
      <TableContainer
        sx={{
          display: { md: "flex", xs: "none" },
        }}
      >
        <Table sx={{ borderBottom: "1px solid #D32F28" }}>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "1px solid #D32F28",
                ".MuiTableCell-root": {
                  fontSize: "18px",
                  color: "#D32F28",
                  fontWeight: "500",
                  border: "0px",
                },
              }}
            >
              <TableCell align="left">SIGNERS</TableCell>
              <TableCell align="center">USDEBT</TableCell>
              <TableCell align="center">ETH</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableItems?.length > 0 &&
              tableItems.map((item, index) => (
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
                  <TableCell align="center">
                    <TokenBalance
                      balance={item.usdebtBalance}
                      tokenIconUrl={"./logo192.png"}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TokenBalance
                      balance={item.ethBalance}
                      tokenIconUrl={
                        "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
                      }
                    />
                  </TableCell>
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
          maxWidth: "540px",
        }}
      >
        {tableItems?.length > 0 &&
          tableItems.map((item, index) => (
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
                    fontSize: { sm: "18px", xs: "16px" },
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
    </Box>
  );
};

export default SignerTable;
