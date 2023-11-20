-- DropForeignKey
ALTER TABLE "Conceptos" DROP CONSTRAINT "Conceptos_code_categoria_fkey";

-- DropForeignKey
ALTER TABLE "DetalleAsiento" DROP CONSTRAINT "DetalleAsiento_id_asiento_fkey";

-- DropForeignKey
ALTER TABLE "DetalleAsiento" DROP CONSTRAINT "DetalleAsiento_id_concepto_fkey";

-- AddForeignKey
ALTER TABLE "Conceptos" ADD CONSTRAINT "Conceptos_code_categoria_fkey" FOREIGN KEY ("code_categoria") REFERENCES "Categorias"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleAsiento" ADD CONSTRAINT "DetalleAsiento_id_asiento_fkey" FOREIGN KEY ("id_asiento") REFERENCES "Asientos"("id_asiento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleAsiento" ADD CONSTRAINT "DetalleAsiento_id_concepto_fkey" FOREIGN KEY ("id_concepto") REFERENCES "Conceptos"("id_concepto") ON DELETE CASCADE ON UPDATE CASCADE;
