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

const PointTable = ({ tableItems }) => {

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
          display: "flex",
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
                  textShadow: "0px 0px 5px #7DF9FF"
                },
              }}
            >
              <TableCell align="left">User</TableCell>
              <TableCell align="right"># of Referrals</TableCell>
              <TableCell align="right">Total Points</TableCell>              
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
                  <TableCell align="left">{item.twitter_name}</TableCell>
                  <TableCell align="right">{item.referred_points}</TableCell>
                  <TableCell align="right">{item.total_points}</TableCell>
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
        <Pagination onChange={(e, v) => { console.log(v); setPage(v) }} varaiant="outlined" page={page} siblingCount={2} boundaryCount={1} count={Math.ceil(tableItems.length / 10)}
          sx={{
            display: 'block',
            ul: {
              '& .MuiPaginationItem-root': {
                color: "white", "&.Mui-selected": { backgroundColor: "#ffffff", color: "#000" },
                ":hover": { backgroundColor: "#ffffff", color: "#000" }
              }
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default PointTable;