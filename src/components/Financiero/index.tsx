import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.mode === "light" ? "head" : "body"}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#f2f2f2" : "#121212",
    color: theme.palette.mode === "light" ? "#121212" : "#f2f2f2",
  },
}));

const assetsData = [
  { account: "Caja", value: 10000 },
  { account: "Cuentas por Cobrar", value: 5000 },
  { account: "Cuentas por Cobrar", value: 1000 },
  { account: "Cuentas por Cobrar", value: 2000 },
];

const liabilitiesData = [
  { account: "Préstamo", value: 3000 },
  { account: "Capital", value: 12000 },
];
const data = [
  { cuenta: "ventas", valor: "" },
  { cuenta: "(-) Desc/ventas", valor: "" },
  { cuenta: "(=) ventas netas", valor: "" },
  { cuenta: "compras", valor: "" },
  { cuenta: "(+) gastos de compra", valor: "" },
  { cuenta: "(=) compras totales", valor: "" },
  { cuenta: "(-) descuent/compra", valor: "" },
  { cuenta: "(=) compras netas", valor: "" },
  { cuenta: "(+) inventario inicial", valor: "" },
  { cuenta: "(=) mercancia disponible", valor: "" },
  { cuenta: "(-) inventario final", valor: "" },
  { cuenta: "(=) costo de venta", valor: "" },
  { cuenta: "(=) utilidad bruta", valor: "5000" },
  { cuenta: "(-) gastos de operación", valor: "3000" },
  { cuenta: "venta", valor: "" },
  { cuenta: "adminis", valor: "" },
  { cuenta: "financiero", valor: "" },
  { cuenta: "(=) utilidad operacional", valor: "" },
];

const financiero = () => {
  return (
    <div
      style={{ textAlign: "center", paddingLeft: "50px", paddingRight: "50px" }}
    >
      <h2 style={{ marginBottom: "10px" }}>Balance General</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 300, marginBottom: 20 }}
          >
            <Table sx={{ minWidth: 300 }} aria-label="activos table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Cuenta de Activos
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Valor
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assetsData.map((row) => (
                  <TableRow key={row.account}>
                    <TableCell>{row.account}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Total Activos
                  </TableCell>
                  <TableCell align="right">18000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="pasivos y capital table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Cuenta de Pasivos y Capital
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Valor
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {liabilitiesData.map((row) => (
                  <TableRow key={row.account}>
                    <TableCell>{row.account}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Total Pasivos y Capital
                  </TableCell>
                  <TableCell align="right">18000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <h2>Estado de resultado</h2>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 400, margin: "auto", marginTop: 20 }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cuentas</StyledTableCell>
              <StyledTableCell align="right">Valores</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.cuenta}>
                <StyledTableCell component="th" scope="row">
                  {row.cuenta}
                </StyledTableCell>
                <StyledTableCell align="right">{row.valor}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default financiero;
