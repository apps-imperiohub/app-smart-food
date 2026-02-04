import { faker } from "@faker-js/faker";
import { cartApi, platoApi, bebidaApi, salsaApi, API_URL } from "../api";
import type {
  AddPlatoToCartDto,
  AddBebidaToCartDto,
  AddSalsaToCartDto,
  TamanoPlato,
} from "../api";
import { prisma } from "../../src/db/prisma.db";

async function seedCarritos() {
  console.log("Iniciando seed de carritos...");
  console.log(`Usando API: ${API_URL}`);

  try {
    // Obtener usuarios existentes (máximo 30)
    const usuarios = await prisma.user.findMany({
      take: 30,
      orderBy: { createdAt: "asc" },
    });

    if (usuarios.length === 0) {
      console.log(
        "❌ No hay usuarios en la base de datos. Ejecuta primero: npm run seed:users",
      );
      return;
    }

    console.log(`✓ Se encontraron ${usuarios.length} usuarios`);

    // Obtener platos, bebidas y salsas desde la API
    const platosData = await platoApi.getAll(false);
    const bebidasData = await bebidaApi.getAll(false);
    const salsasData = await salsaApi.getAll(false);

    console.log(`✓ Se encontraron ${platosData.length} platos activos`);
    console.log(`✓ Se encontraron ${bebidasData.length} bebidas activas`);
    console.log(`✓ Se encontraron ${salsasData.length} salsas activas`);

    if (
      platosData.length === 0 ||
      bebidasData.length === 0 ||
      salsasData.length === 0
    ) {
      console.log(
        "⚠️  Faltan datos. Ejecuta primero: npm run seed:platos, npm run seed:bebidas y npm run seed:salsas",
      );
      return;
    }

    let carritosCreados = 0;
    let platosAgregados = 0;
    let bebidasAgregadas = 0;
    let salsasAgregadas = 0;

    // Crear carritos para cada usuario con artículos variados
    for (const usuario of usuarios) {
      try {
        console.log(
          `\nProcesando usuario: ${usuario.nombre} (${usuario.email})`,
        );

        // Obtener o crear el carrito del usuario
        const carrito = await cartApi.getCart(usuario.id);
        carritosCreados++;

        // Agregar 1-4 platos aleatorios al carrito
        const cantidadPlatos = faker.number.int({ min: 1, max: 4 });
        const platosSeleccionados = faker.helpers.arrayElements(
          platosData,
          Math.min(cantidadPlatos, platosData.length),
        );

        for (const plato of platosSeleccionados) {
          const tamanos: TamanoPlato[] = ["S", "M", "L"];
          const tamanoAleatorio = faker.helpers.arrayElement(tamanos);
          const cantidad = faker.number.int({ min: 1, max: 3 });

          const platoData: AddPlatoToCartDto = {
            platoId: plato.id,
            tamano: tamanoAleatorio,
            cantidad,
            notas: faker.datatype.boolean({ probability: 0.3 })
              ? faker.lorem.sentence({ min: 2, max: 4 })
              : null,
          };

          try {
            await cartApi.addPlato(usuario.id, platoData);
            platosAgregados++;
            console.log(`  ✓ Agregado plato: ${plato.nombre} (${cantidad}x)`);
          } catch (error) {
            console.error(
              `  ❌ Error al agregar plato ${plato.nombre}:`,
              error instanceof Error ? error.message : "Error desconocido",
            );
          }
        }

        // Agregar 0-2 bebidas aleatorias al carrito
        const cantidadBebidas = faker.number.int({ min: 0, max: 2 });
        const bebidasSeleccionadas = faker.helpers.arrayElements(
          bebidasData,
          Math.min(cantidadBebidas, bebidasData.length),
        );

        for (const bebida of bebidasSeleccionadas) {
          const bebidaData: AddBebidaToCartDto = {
            bebidaId: bebida.id,
            cantidad: faker.number.int({ min: 1, max: 2 }),
          };

          try {
            await cartApi.addBebida(usuario.id, bebidaData);
            bebidasAgregadas++;
            console.log(`  ✓ Agregada bebida: ${bebida.nombre}`);
          } catch (error) {
            console.error(
              `  ❌ Error al agregar bebida ${bebida.nombre}:`,
              error instanceof Error ? error.message : "Error desconocido",
            );
          }
        }

        // Agregar 0-3 salsas aleatorias al carrito
        const cantidadSalsas = faker.number.int({ min: 0, max: 3 });
        const salsasSeleccionadas = faker.helpers.arrayElements(
          salsasData,
          Math.min(cantidadSalsas, salsasData.length),
        );

        for (const salsa of salsasSeleccionadas) {
          const salsaData: AddSalsaToCartDto = {
            salsaId: salsa.id,
            cantidad: faker.number.int({ min: 1, max: 2 }),
          };

          try {
            await cartApi.addSalsa(usuario.id, salsaData);
            salsasAgregadas++;
            console.log(`  ✓ Agregada salsa: ${salsa.nombre}`);
          } catch (error) {
            console.error(
              `  ❌ Error al agregar salsa ${salsa.nombre}:`,
              error instanceof Error ? error.message : "Error desconocido",
            );
          }
        }
      } catch (error) {
        console.error(
          `❌ Error procesando usuario ${usuario.email}:`,
          error instanceof Error ? error.message : "Error desconocido",
        );
      }
    }

    console.log("\n════════════════════════════════════════════════════");
    console.log("✓ Seed de carritos completado:");
    console.log(`  • Carritos creados: ${carritosCreados}`);
    console.log(`  • Platos agregados: ${platosAgregados}`);
    console.log(`  • Bebidas agregadas: ${bebidasAgregadas}`);
    console.log(`  • Salsas agregadas: ${salsasAgregadas}`);
    console.log("════════════════════════════════════════════════════\n");
  } catch (error) {
    console.error(
      "❌ Error fatal en seed:",
      error instanceof Error ? error.message : "Error desconocido",
    );
    throw error;
  }
}

seedCarritos()
  .catch((error) => {
    console.error("Error en seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export { seedCarritos };
