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
import useEstadosFinancieros from "@/hooks/useEstadosFinancieros";
import usePrecios from "@/hooks/usePrecios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.mode === "light" ? "head" : "body"}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#f2f2f2" : "#121212",
    color: theme.palette.mode === "light" ? "#121212" : "#f2f2f2",
  },
}));

const Financiero = () => {
  const { estadosFinancieros } = useEstadosFinancieros();
  const inventarioFinal = usePrecios((state) => state.inventarioFinal);

  const estadoDeResultado = estadosFinancieros?.estadoDeResultado;
  const balanceGeneral = estadosFinancieros?.balanceGeneral;

  if (!estadoDeResultado || !balanceGeneral) return;

  const ventas = +estadoDeResultado["5101"] || 0;
  const descVentas = +estadoDeResultado["4204"] || 0;
  const gastoCompra = +estadoDeResultado["4102"] || 0;
  const descuentoCompra = +estadoDeResultado["5103"] || 0;
  const invetarioInicial = +estadoDeResultado["1109"] || 0;
  const gastosOperacion =
    (+estadoDeResultado["4201"] || 0) +
    (+estadoDeResultado["4202"] || 0) +
    (+estadoDeResultado["4203"] || 0);

  const ventasNetas = ventas - descVentas,
    comprasTotales = ventasNetas + gastoCompra,
    comprasNetas = comprasTotales - descuentoCompra,
    mercanciaDisponible = comprasNetas + invetarioInicial,
    costoVenta = mercanciaDisponible - inventarioFinal,
    utilidadBruta = ventasNetas - costoVenta,
    utilidadOperacional = utilidadBruta - gastosOperacion;

  const data = [
    { cuenta: "ventas", valor: ventas },
    { cuenta: "(-) Desc/ventas", valor: descVentas },
    { cuenta: "(=) ventas netas", valor: ventas - descVentas },
    { cuenta: "compras", valor: "" },
    { cuenta: "(+) gastos de compra", valor: gastoCompra },
    { cuenta: "(=) compras totales", valor: ventas - descVentas + gastoCompra },
    { cuenta: "(-) descuent/compra", valor: descuentoCompra },
    { cuenta: "(=) compras netas", valor: comprasNetas },
    { cuenta: "(+) inventario inicial", valor: invetarioInicial },
    { cuenta: "(=) mercancia disponible", valor: mercanciaDisponible },
    { cuenta: "(-) inventario final", valor: inventarioFinal },
    { cuenta: "(=) costo de venta", valor: costoVenta },
    { cuenta: "(=) utilidad bruta", valor: utilidadBruta },
    { cuenta: "(-) gastos de operación", valor: gastosOperacion },
    { cuenta: "(=) utilidad operacional", valor: utilidadOperacional },
  ];

  const cuentas = Object.entries(balanceGeneral);
  const activos = cuentas.filter(
    (c) => balanceGeneral[c[0]].code_categoria == "1"
  );
  const pasivos = cuentas.filter(
    (c) => balanceGeneral[c[0]].code_categoria == "2"
  );
  const capital = cuentas.filter(
    (c) => balanceGeneral[c[0]].code_categoria == "3"
  );

  let totalActivos = 0,
    totalPasivos = 0,
    totalCapital = 0;
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
                {activos.map((row, i) => {
                  totalActivos += +row[1].saldo || 0;
                  return (
                    <TableRow key={i}>
                      <TableCell>{row[0]}</TableCell>
                      <TableCell align="right">{row[1].saldo}</TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Total Activos
                  </TableCell>
                  <TableCell align="right">${totalActivos}</TableCell>
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
                {pasivos.map((row, i) => {
                  totalPasivos += +row[1].saldo || 0;
                  return (
                    <TableRow key={i}>
                      <TableCell>{row[0]}</TableCell>
                      <TableCell align="right">${row[1].saldo}</TableCell>
                    </TableRow>
                  );
                })}
                {capital.map((row, i) => {
                  totalCapital += +row[1].saldo || 0;
                  return (
                    <TableRow key={i}>
                      <TableCell>{row[0]}</TableCell>
                      <TableCell align="right">${row[1].saldo}</TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Total Pasivos y Capital
                  </TableCell>
                  <TableCell align="right">
                    ${totalCapital + totalPasivos}
                  </TableCell>
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
                <StyledTableCell align="right">${row.valor}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Financiero;
