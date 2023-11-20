/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `Conceptos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Categorias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_categoria` to the `Conceptos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conceptos" DROP CONSTRAINT "Conceptos_id_categoria_fkey";

-- AlterTable
ALTER TABLE "Categorias" ADD COLUMN     "code" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Conceptos" DROP COLUMN "id_categoria",
ADD COLUMN     "code_categoria" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categorias_code_key" ON "Categorias"("code");

-- AddForeignKey
ALTER TABLE "Conceptos" ADD CONSTRAINT "Conceptos_code_categoria_fkey" FOREIGN KEY ("code_categoria") REFERENCES "Categorias"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
