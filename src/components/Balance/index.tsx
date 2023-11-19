import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#90caf9",
    color: "#121212",
    fontWeight: "bold",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Balance() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Balance de comprobacion
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="10%">Codigo</StyledTableCell>
              <StyledTableCell align="center">Concepto</StyledTableCell>
              <StyledTableCell align="center" width="10%">
                Movimiento acreedor
              </StyledTableCell>
              <StyledTableCell align="center" width="10%">
                Movimientos deudor
              </StyledTableCell>
              <StyledTableCell align="center" width="10%">
                Saldo deudor
              </StyledTableCell>
              <StyledTableCell align="center" width="10%">
                Saldo acreedor
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.calories}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                <StyledTableCell align="center">{row.protein}</StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell
                align="center"
                colSpan={2}
                style={{ fontWeight: "bold" }}
              >
                Total
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                1000
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                1000
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                1000
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                1000
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
