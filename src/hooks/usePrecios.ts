import { create } from "zustand";

const usePrecios = create<Props>((set) => ({
  precioVenta: 0,
  costoVenta: 0,
  inventarioFinal: 0,
  setPrecioVenta: (precio: number) => set(() => ({ precioVenta: precio })),
  setCostoVenta: (costo: number) => set(() => ({ costoVenta: costo })),
  setInventarioFinal: (valor: number) =>
    set(() => ({ inventarioFinal: valor })),
}));
export default usePrecios;

type Props = {
  precioVenta: number;
  costoVenta: number;
  inventarioFinal: number;
  setPrecioVenta: (precio: number) => void;
  setCostoVenta: (costo: number) => void;
  setInventarioFinal: (valor: number) => void;
};
