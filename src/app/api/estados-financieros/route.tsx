import { NextResponse } from "next/server";
import prisma from "../prisma";
import { BalanceComprobacion, EstadoDeResultado } from "@/types";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const balanceGeneral: BalanceComprobacion[] = await prisma.$queryRaw`
    SELECT
        c.id_concepto,
        c.name AS concepto,
        c.code_categoria AS code_categoria,
        SUM(da.debe) AS total_debe,
        SUM(da.haber) AS total_haber,
        ABS(SUM(da.debe) - SUM(da.haber)) saldo
    FROM
        "DetalleAsiento" da
    JOIN
        "Conceptos" c ON da.id_concepto = c.id_concepto
    WHERE
        c.code_categoria IN ('1', '2', '3')
    GROUP BY
        c.id_concepto, c.name, c.code_categoria
    ORDER BY
        c.code;
    `;

  const estadoDeResultado: EstadoDeResultado[] = await prisma.$queryRaw`
    SELECT
        c."code" AS codigo,
        ABS(SUM(da.DEBE) - SUM(da.HABER)) AS valor
    FROM "DetalleAsiento" da 
    JOIN "Conceptos" c ON c.ID_CONCEPTO = da.ID_CONCEPTO 
    JOIN "Categorias" c2 ON c2.CODE  = c.CODE_CATEGORIA 
    WHERE c2.CODE IN ('41', '51') OR c.CODE = '1109'
    GROUP BY c."code" 
  `;

  return NextResponse.json({
    balanceGeneral: balanceGeneral.reduce((prev, current) => {
      const { concepto, ..._current } = current;
      prev[concepto] = _current;
      return prev;
    }, {} as { [k: string]: {} }),
    estadoDeResultado: estadoDeResultado.reduce((prev, current) => {
      prev[current.codigo] = +current.valor;
      return prev;
    }, {} as { [k: string]: number }),
  });
};
