import { NextResponse } from "next/server";
import prisma from "../prisma";
import { BalanceComprobacion } from "@/types";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const balance: BalanceComprobacion[] = await prisma.$queryRaw`
    SELECT
        c.id_concepto,
        c.name AS concepto,
        c.code AS codigo,
        SUM(da.debe) AS debe,
        SUM(da.haber) AS haber,
        CASE
            WHEN SUM(da.debe) > SUM(da.haber)
            THEN SUM(da.debe) - SUM(da.haber)
            ELSE 0
        END AS saldo_deudor,
        CASE
            WHEN SUM(da.debe) < SUM(da.haber)
            THEN SUM(da.haber) - SUM(da.debe)
            ELSE 0
        END AS saldo_acreedor
    FROM
        public."DetalleAsiento" da
    JOIN
        public."Conceptos" c ON da.id_concepto = c.id_concepto
    GROUP BY
        c.id_concepto, c.name
    ORDER BY
        c.code;
  `;

  const totals = {
    total_debe: 0,
    total_haber: 0,
    total_deudor: 0,
    total_acreedor: 0,
  };
  balance.forEach((b) => {
    totals.total_debe += +b.debe;
    totals.total_haber += +b.haber;
    totals.total_deudor += +b.saldo_deudor;
    totals.total_acreedor += +b.saldo_acreedor;
  });

  return NextResponse.json({
    balances: balance,
    totals,
  });
};
