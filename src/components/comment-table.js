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

const CommentTable = ({ tableItems }) => {

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
              <TableCell align="left">Comment</TableCell>
              <TableCell align="right">Signer</TableCell>
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
                  <TableCell align="left">{item.comment}</TableCell>
                  <TableCell align="right">{item.signer.substring(0, 4) + "..." + item.signer.substring(item.signer.length - 4)}</TableCell>
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

export default CommentTable;