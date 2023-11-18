-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Conceptos" (
    "id_concepto" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Conceptos_pkey" PRIMARY KEY ("id_concepto")
);

-- CreateTable
CREATE TABLE "Asientos" (
    "id_asiento" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "date" DATE NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Asientos_pkey" PRIMARY KEY ("id_asiento")
);

-- CreateTable
CREATE TABLE "DetalleAsiento" (
    "id_detalle_asiento" SERIAL NOT NULL,
    "debe" DECIMAL(10,2) DEFAULT 0,
    "haber" DECIMAL(10,2) DEFAULT 0,
    "id_asiento" INTEGER NOT NULL,
    "id_concepto" INTEGER NOT NULL,

    CONSTRAINT "DetalleAsiento_pkey" PRIMARY KEY ("id_detalle_asiento")
);

-- AddForeignKey
ALTER TABLE "Conceptos" ADD CONSTRAINT "Conceptos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleAsiento" ADD CONSTRAINT "DetalleAsiento_id_asiento_fkey" FOREIGN KEY ("id_asiento") REFERENCES "Asientos"("id_asiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleAsiento" ADD CONSTRAINT "DetalleAsiento_id_concepto_fkey" FOREIGN KEY ("id_concepto") REFERENCES "Conceptos"("id_concepto") ON DELETE RESTRICT ON UPDATE CASCADE;
