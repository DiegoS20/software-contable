import { Kardex } from "@/types";
import prisma from "../prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const kardex: Kardex = await prisma.$queryRaw`
    SELECT
        a."date" AS fecha,
        c.CODE AS codigo,
        c."name" AS concepto,
        SUM(da.DEBE) AS debe,
        SUM(da.HABER) AS haber
    FROM "DetalleAsiento" da
    JOIN "Conceptos" c ON da.ID_CONCEPTO = c.ID_CONCEPTO
    JOIN "Asientos" a ON a.ID_ASIENTO = da.ID_ASIENTO 
    JOIN "Categorias" c2 ON c2.CODE  = c.CODE_CATEGORIA 
    WHERE c.CODE IN ('1109', '4101', '5101', '5104', '4104')
    GROUP BY c."name", c.CODE, a."date"
    ORDER BY c.CODE, a."date" 
  `;

  return NextResponse.json(kardex);
};
