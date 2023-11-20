import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useKardex from "@/hooks/useKardex";
import usePrecios from "@/hooks/usePrecios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#90caf9",
    color: "#121212",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const cuentas = ["DEVOLUCIONES SOBRE VENTAS", "VENTAS"];

export default function Kardex() {
  const { kardex } = useKardex();
  const precioVenta = usePrecios((state) => state.precioVenta);
  const costoVenta = usePrecios((state) => state.costoVenta);
  const setInventarioFinal = usePrecios((state) => state.setInventarioFinal);

  let existencias = 0,
    saldoTotal = 0;

  const rows = kardex?.map((row, i) => {
    const divider =
      cuentas.indexOf(row.concepto) > 0 ? precioVenta : costoVenta;
    const entrada = +row.debe / divider;
    const salida = +row.haber / divider;
    existencias += entrada - salida;
    saldoTotal += +row.debe - +row.haber;

    return (
      <StyledTableRow key={i}>
        <StyledTableCell component="th" scope="row">
          {new Date(row.fecha).toLocaleDateString()}
        </StyledTableCell>
        <StyledTableCell align="left">{row.concepto}</StyledTableCell>
        <StyledTableCell align="center">{entrada.toFixed(0)}</StyledTableCell>
        <StyledTableCell align="center">{salida.toFixed(0)}</StyledTableCell>
        <StyledTableCell align="center">
          {existencias.toFixed(0)}
        </StyledTableCell>
        <StyledTableCell align="center">${costoVenta}</StyledTableCell>
        <StyledTableCell align="center">${row.debe}</StyledTableCell>
        <StyledTableCell align="center">${row.haber}</StyledTableCell>
        <StyledTableCell align="center">${saldoTotal}</StyledTableCell>
      </StyledTableRow>
    );
  });

  setInventarioFinal(saldoTotal);
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Kardex</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell align="center">Concepto</StyledTableCell>
              <StyledTableCell align="right">Entrada</StyledTableCell>
              <StyledTableCell align="right">Salida</StyledTableCell>
              <StyledTableCell align="right">Existencia</StyledTableCell>
              <StyledTableCell align="right">Costo unitario</StyledTableCell>
              <StyledTableCell align="right">Debe</StyledTableCell>
              <StyledTableCell align="right">Haber</StyledTableCell>
              <StyledTableCell align="right">Saldo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
