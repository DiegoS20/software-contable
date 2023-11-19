import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

function createData(
  code: string,
  date: string,
  concept: string,
  debit: number,
  credit: number
) {
  return { code, date, concept, debit, credit };
}

const rows = [
  createData("001", "2023-01-01", "Sales", 1000, 0),
  createData("002", "2023-01-02", "Purchase", 0, 800),
  createData("003", "2023-01-02", "Purc", 0, 200),
  // Add more rows as needed
];

const DailyBook = () => {
  const BoldTableCell = styled(TableCell)({
    fontWeight: "bold",
    backgroundColor: "#90caf9",
  });
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Libro diario
      </h2>
      <TableContainer component={Paper} sx={{ background: "#f0f0f0" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ background: "#42a5f5" }}>
            <TableRow>
              <BoldTableCell>Codigo</BoldTableCell>
              <BoldTableCell align="right">Fecha</BoldTableCell>
              <BoldTableCell align="center" width="40%">
                Concepto
              </BoldTableCell>
              <BoldTableCell align="center" width="20%">
                Debe
              </BoldTableCell>
              <BoldTableCell align="center" width="20%">
                Haber
              </BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="center">{row.concept}</TableCell>
                <TableCell align="center" width="20%">
                  {row.debit}
                </TableCell>
                <TableCell align="center" width="20%">
                  {row.credit}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>total</TableCell>
              <TableCell align="center">1000</TableCell>
              <TableCell align="center">1000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DailyBook;
