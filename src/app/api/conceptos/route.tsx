import { NextResponse } from "next/server";
import prisma from "../prisma";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const conceptos = await prisma.categorias.findMany({
    select: {
      code: true,
      name: true,
      Conceptos: {
        select: {
          id_concepto: true,
          code: true,
          name: true,
          categoria: true,
        },
      },
    },
  });

  return NextResponse.json(conceptos);
};
