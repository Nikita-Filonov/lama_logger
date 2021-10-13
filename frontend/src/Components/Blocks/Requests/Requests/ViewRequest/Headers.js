import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ViewRequestStyles} from "../../../../../Styles/Blocks";


export const Headers = ({headers}) => {
  const classes = ViewRequestStyles()

  return (
    <TableContainer className={classes.headersContainer}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(headers).map((key, index) => (
            <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell component="th" scope="row">{key}</TableCell>
              <TableCell align="left" style={{
                wordWrap: 'break-word',
                whiteSpace: 'pre-line',
                maxWidth: 300
              }}>{headers[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}



