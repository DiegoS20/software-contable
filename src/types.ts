export type Categoria = {
  code: string;
  name: string;
};

export type CategoriaTable = Categoria & {
  id_categoria: number;
};

export type Concepto = {
  code: string;
  name: string;
};

export type ConceptoTable = Concepto & {
  id_concepto: number;
  categoria: CategoriaTable;
};

export type Asiento = {
  name: string;
  date: Date;
  comment: string;
  DetalleAsiento?: DetalleAsientoCreateInTable[];
};

export type AsientoTable = Asiento & {
  id_asiento: number;
  DetalleAsiento?: DetalleAsientoTable[];
};

export type DetalleAsiento = {
  debe?: number;
  haber?: number;
  concepto: ConceptoTable;
};

export type DetalleAsientoTable = DetalleAsiento & {
  id_detalle_asiento: number;
};

export type DetalleAsientoCreateInTable = Omit<
  DetalleAsientoTable,
  "id_detalle_asiento"
>;

export type BalanceComprobacion = {
  id_concepto: number;
  concepto: string;
  codigo: string;
  debe: string;
  haber: string;
  saldo_deudor: string;
  saldo_acreedor: string;
};

export type Kardex = {
  fecha: string;
  codigo: string;
  concepto: string;
  debe: string;
  haber: string;
};

export type EstadoDeResultado = {
  codigo: string;
  valor: string;
};
