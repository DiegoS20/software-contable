import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

const financiero = () => {
  return (
    <div
      style={{ textAlign: "center", paddingLeft: "50px", paddingRight: "50px" }}
    >
      <h2 style={{ marginBottom: "10px" }}>Balance General</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
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
    </div>
  );
};

export default financiero;
