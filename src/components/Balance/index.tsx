import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useBalanceComprobacion from "@/hooks/useBalanceComprobacion";

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

export default function Balance() {
  const { balanceComprobacion } = useBalanceComprobacion();

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
            {balanceComprobacion?.balances.map((row) => (
              <StyledTableRow key={row.codigo}>
                <StyledTableCell component="th" scope="row">
                  {row.codigo}
                </StyledTableCell>
                <StyledTableCell align="left">{row.concepto}</StyledTableCell>
                <StyledTableCell align="center">${row.debe}</StyledTableCell>
                <StyledTableCell align="center">${row.haber}</StyledTableCell>
                <StyledTableCell align="center">
                  ${row.saldo_deudor}
                </StyledTableCell>
                <StyledTableCell align="center">
                  ${row.saldo_acreedor}
                </StyledTableCell>
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
                ${balanceComprobacion?.totals.total_debe}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                ${balanceComprobacion?.totals.total_haber}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                ${balanceComprobacion?.totals.total_deudor}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                ${balanceComprobacion?.totals.total_acreedor}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
