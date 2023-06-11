-- DropForeignKey
ALTER TABLE "diplomacias" DROP CONSTRAINT "diplomacias_id_reino_1_fkey";

-- DropForeignKey
ALTER TABLE "diplomacias" DROP CONSTRAINT "diplomacias_id_reino_2_fkey";

-- DropForeignKey
ALTER TABLE "personaje_habita_reino" DROP CONSTRAINT "personaje_habita_reino_id_personaje_fkey";

-- DropForeignKey
ALTER TABLE "personaje_habita_reino" DROP CONSTRAINT "personaje_habita_reino_id_reino_fkey";

-- DropForeignKey
ALTER TABLE "personaje_tiene_trabajo" DROP CONSTRAINT "personaje_tiene_trabajo_id_personaje_fkey";

-- DropForeignKey
ALTER TABLE "personaje_tiene_trabajo" DROP CONSTRAINT "personaje_tiene_trabajo_id_trabajo_fkey";

-- DropForeignKey
ALTER TABLE "reino_tiene_defensa" DROP CONSTRAINT "reino_tiene_defensa_id_defensa_fkey";

-- DropForeignKey
ALTER TABLE "reino_tiene_defensa" DROP CONSTRAINT "reino_tiene_defensa_id_reino_fkey";

-- AddForeignKey
ALTER TABLE "personaje_tiene_trabajo" ADD CONSTRAINT "personaje_tiene_trabajo_id_trabajo_fkey" FOREIGN KEY ("id_trabajo") REFERENCES "trabajos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personaje_tiene_trabajo" ADD CONSTRAINT "personaje_tiene_trabajo_id_personaje_fkey" FOREIGN KEY ("id_personaje") REFERENCES "personajes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personaje_habita_reino" ADD CONSTRAINT "personaje_habita_reino_id_personaje_fkey" FOREIGN KEY ("id_personaje") REFERENCES "personajes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personaje_habita_reino" ADD CONSTRAINT "personaje_habita_reino_id_reino_fkey" FOREIGN KEY ("id_reino") REFERENCES "reinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomacias" ADD CONSTRAINT "diplomacias_id_reino_1_fkey" FOREIGN KEY ("id_reino_1") REFERENCES "reinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomacias" ADD CONSTRAINT "diplomacias_id_reino_2_fkey" FOREIGN KEY ("id_reino_2") REFERENCES "reinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reino_tiene_defensa" ADD CONSTRAINT "reino_tiene_defensa_id_reino_fkey" FOREIGN KEY ("id_reino") REFERENCES "reinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reino_tiene_defensa" ADD CONSTRAINT "reino_tiene_defensa_id_defensa_fkey" FOREIGN KEY ("id_defensa") REFERENCES "defensas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
