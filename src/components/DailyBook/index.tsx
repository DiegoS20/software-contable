"use client";

import { Fragment, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import AddAsientoModal from "./AddAsientoModal";
import useAsientos from "@/hooks/useAsientos";

const DailyBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const { asientos } = useAsientos();

  const BoldTableCell = styled(TableCell)({
    fontWeight: "bold",
    backgroundColor: "#90caf9",
  });
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Libro diario
      </h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(true)}
        sx={{ marginBottom: "25px" }}
      >
        Agregar Asiento
      </Button>
      <TableContainer component={Paper} sx={{ background: "#f0f0f0" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ background: "#42a5f5" }}>
            <TableRow>
              <BoldTableCell align="center">Fecha</BoldTableCell>
              <BoldTableCell align="center">Codigo</BoldTableCell>
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
            {asientos?.map((a) => {
              let totalDebe = 0;
              let totalHaber = 0;
              return (
                <Fragment key={a.id_asiento}>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                      }}
                    >
                      Asiento {a.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={a.DetalleAsiento!.length + 1}>
                      {new Date(a.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                  {a.DetalleAsiento?.map((da, i) => {
                    totalDebe += +(da.debe || 0);
                    totalHaber += +(da.haber || 0);
                    return (
                      <TableRow key={i}>
                        <TableCell>{da.concepto.code}</TableCell>
                        <TableCell>{da.concepto.name}</TableCell>
                        <TableCell>${da.debe || 0}</TableCell>
                        <TableCell>${da.haber || 0}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell colSpan={3} style={{ fontStyle: "italic" }}>
                      c/ {a.comment}
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      ${totalDebe}
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      ${totalHaber}
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AddAsientoModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default DailyBook;
