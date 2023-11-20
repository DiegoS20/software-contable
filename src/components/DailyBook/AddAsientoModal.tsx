import { Fragment, useState } from "react";
import dayjs from "dayjs";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import {
  Grid,
  Paper,
  Table,
  Button,
  Select,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  InputLabel,
  FormControl,
  ListSubheader,
  TableContainer,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Modal from "../Modal";
import { Asiento, DetalleAsiento, DetalleAsientoTable } from "@/types";
import useConceptos from "@/hooks/useConceptos";
import useAsientos from "@/hooks/useAsientos";

export default function AddAsientoModal({ open, onClose }: Props) {
  const [conceptosModalOpen, setConceptosModalOpen] = useState(false);
  const { conceptos } = useConceptos();
  const { createAsiento, reloadAsientos } = useAsientos();
  const {
    handleSubmit: handleAsientoForm,
    control: asientoControl,
    reset: resetAsiento,
  } = useForm<Asiento>({
    defaultValues: {
      name: "",
      date: new Date(),
      comment: "",
      DetalleAsiento: [],
    },
  });
  const {
    handleSubmit: handleConceptoSubmit,
    control: conceptoControl,
    watch,
    reset: resetDetalleAsiento,
  } = useForm<DetalleAsientoTable>({
    defaultValues: {
      debe: 0,
      haber: 0,
      concepto: {
        id_concepto: 0,
        code: "",
        name: "",
        categoria: {
          code: "",
          name: "",
        },
      },
    },
  });
  const conceptoFields = watch();
  const { fields, append, remove } = useFieldArray({
    control: asientoControl,
    name: "DetalleAsiento",
  });

  const handleAsientoFormSubmit: SubmitHandler<Asiento> = async (data) => {
    let haber = 0,
      debe = 0;
    fields.forEach((f) => {
      haber += +(f.haber || 0);
      debe += +(f.debe || 0);
    });
    if (haber != debe) {
      alert("El debe y el haber deben igualarse en cantidad");
      return;
    }
    await createAsiento(data);
    resetDetalleAsiento();
    resetAsiento();
    reloadAsientos();
    onClose();
  };

  const handleConceptoFormSubmit: SubmitHandler<DetalleAsiento> = (data) => {
    setConceptosModalOpen(false);
    append(data);
    resetDetalleAsiento();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <h2 style={{ textAlign: "center", marginBottom: 25 }}>
          Agregar asiento
        </h2>
        <form onSubmit={handleAsientoForm(handleAsientoFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={asientoControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="name"
                    placeholder="Identificador del asiento"
                    label="Identificador del asiento"
                    autoComplete="off"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="date"
                  control={asientoControl}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      label="Fecha"
                      value={dayjs(value)}
                      maxDate={dayjs(new Date())}
                      onChange={(date) => onChange(date?.toDate())}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="comment"
                control={asientoControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    id="comment"
                    placeholder="Comentario"
                    label="Comentario"
                    rows={5}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => setConceptosModalOpen(true)}
              >
                Agregar concepto
              </Button>
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Concepto</TableCell>
                      <TableCell>Debe</TableCell>
                      <TableCell>Haber</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((f, i) => (
                      <TableRow key={f.id}>
                        <TableCell>{f.concepto?.name}</TableCell>
                        <TableCell>${f.debe || 0}</TableCell>
                        <TableCell>${f.haber || 0}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => remove(i)}
                          >
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="success">
                Agregar asiento
              </Button>
            </Grid>
          </Grid>
        </form>
        <Modal
          open={conceptosModalOpen}
          onClose={() => setConceptosModalOpen(false)}
        >
          <form onSubmit={handleConceptoSubmit(handleConceptoFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={conceptoControl}
                  name="concepto"
                  render={({ field: { value, onChange } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Cuenta
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        value={`${value.code}-${value.categoria.code}`}
                        label="Cuenta"
                        onChange={(event) => {
                          const { value } = event.target;
                          const [itemCode, categoriaCode] = (
                            value as string
                          ).split("-");
                          onChange(
                            conceptos
                              ?.find((c) => c.code == categoriaCode)
                              ?.Conceptos.find((c) => c.code == itemCode)
                          );
                        }}
                      >
                        {conceptos?.map((c, i) => [
                          <ListSubheader key={i}>{c.name}</ListSubheader>,
                          c.Conceptos.map((cl) => (
                            <MenuItem
                              key={cl.code}
                              value={`${cl.code}-${c.code}`}
                            >
                              {cl.name}
                            </MenuItem>
                          )),
                        ])}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="debe"
                  control={conceptoControl}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      id="debe"
                      placeholder="Debe"
                      label="Debe"
                      autoComplete="off"
                      disabled={
                        !!(conceptoFields.haber && conceptoFields.haber > 0)
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="haber"
                  control={conceptoControl}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      id="haber"
                      placeholder="Haber"
                      label="Haber"
                      autoComplete="off"
                      disabled={
                        !!(conceptoFields.debe && conceptoFields.debe > 0)
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="success" type="submit">
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Modal>
      </>
    </Modal>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
};
