import prisma from "../prisma";
import { NextResponse } from "next/server";
import { Asiento } from "@/types";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  const { DetalleAsiento, ...asiento } = (await req.json()) as Asiento;

  await prisma.asientos.create({
    data: {
      ...asiento,
      DetalleAsiento: {
        create: DetalleAsiento?.map((v) => ({
          concepto: {
            connect: {
              id_concepto: v.concepto.id_concepto,
            },
          },
          debe: +(v.debe || 0),
          haber: +(v.haber || 0),
        })),
      },
    },
  });

  return NextResponse.json({}, { status: 201 });
};

export const GET = async () => {
  return NextResponse.json(
    await prisma.asientos.findMany({
      include: {
        DetalleAsiento: {
          select: {
            id_detalle_asiento: true,
            debe: true,
            haber: true,
            concepto: {
              include: {
                categoria: {
                  select: {
                    id_categoria: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  );
};
