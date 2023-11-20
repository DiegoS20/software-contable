import usePrecios from "@/hooks/usePrecios";
import { Grid, TextField } from "@mui/material";

export default function Precios() {
  const setPrecioVenta = usePrecios((state) => state.setPrecioVenta);
  const setCostoVenta = usePrecios((state) => state.setCostoVenta);

  return (
    <Grid container spacing={2} style={{ padding: 25 }}>
      <Grid item xs={12}>
        <h1
          style={{
            marginBottom: 25,
          }}
        >
          Software contable para Hikaru - venta de motos
        </h1>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          style={{ width: "25%" }}
          label="Precio de venta ($)"
          placeholder="Precio de venta"
          autoComplete="off"
          onChange={(event) => setPrecioVenta(+event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          style={{ width: "25%" }}
          label="Costo de venta ($)"
          placeholder="Costo de venta"
          autoComplete="off"
          onChange={(event) => setCostoVenta(+event.target.value)}
        />
      </Grid>
    </Grid>
  );
}
