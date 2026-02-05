import { faker } from "@faker-js/faker";
import { pedidoApi, platoApi, API_URL } from "../api";
import prisma from "../../src/db/prisma.db";

async function seedPedidos() {
  console.log("Iniciando seed de pedidos...");

  console.log(`Usando API: ${API_URL}`);

  // Obtener platos desde la API y usuarios/direcciones desde la DB
  const platos = await platoApi.getAll(true).catch(() => []);
  const users = await prisma.user.findMany({
    include: { direccionnesEnvios: true },
  });

  let creados = 0;

  for (const user of users) {
    const direcciones = user.direccionnesEnvios || [];
    if (direcciones.length === 0) continue;

    // Crear entre 1 y 3 pedidos por usuario (probabilidad baja)
    const cantidadPedidos = faker.datatype.boolean({ probability: 0.25 })
      ? faker.number.int({ min: 1, max: 3 })
      : 0;

    for (let p = 0; p < cantidadPedidos; p++) {
      const itemsCount = faker.number.int({ min: 1, max: 4 });
      const itemsCreate: any[] = [];
      let subtotal = 0;

      for (let i = 0; i < itemsCount; i++) {
        const plato = faker.helpers.arrayElement(platos) as any;
        if (!plato) continue;

        const precioEntry = faker.helpers.arrayElement(
          plato.precios || [],
        ) as any;
        const precio = precioEntry
          ? Number(precioEntry.precio)
          : faker.number.float({ min: 50, max: 200, fractionDigits: 2 });
        const cantidad = faker.number.int({ min: 1, max: 3 });
        const itemSubtotal = Math.round(precio * cantidad * 100) / 100;
        subtotal += itemSubtotal;

        itemsCreate.push({
          platoId: plato.id,
          nombre: plato.nombre,
          tamano: precioEntry ? precioEntry.tamano : "M",
          precio: itemSubtotal / cantidad,
          cantidad,
          subtotal: itemSubtotal,
        });
      }

      subtotal = Math.round(subtotal * 100) / 100;
      const costoEnvio =
        Math.round(
          faker.number.float({ min: 0, max: 50, fractionDigits: 2 }) * 100,
        ) / 100;
      const total = Math.round((subtotal + costoEnvio) * 100) / 100;

      const direccion =
        faker.helpers.arrayElement(direcciones) || direcciones[0];
      if (!direccion) continue;

      const data: any = {
        userId: user.id,
        direccionEnvioId: direccion.id,
        subtotal,
        costoEnvio,
        total,
        notas: faker.lorem.sentence(),
        items: { create: itemsCreate },
      };

      try {
        // Mensaje conciso antes de la creación
        console.log(
          `Creando pedido para ${user.email} — subtotal=${data.subtotal} total=${data.total} items=${itemsCreate.length}`,
        );

        // Crear pedido mediante la API
        const creado = await pedidoApi.create(data);

        creados++;
        if (creado && creado.id) {
          console.log(
            `[OK] Pedido creado para ${user.email}: ${creado.id} (número ${
              creado.numeroPedido ?? "N/A"
            })`,
          );
        } else {
          console.warn(
            `Pedido creado pero sin id retornado para ${user.email}`,
          );
        }

        // Pequeña espera para no saturar la API
        await new Promise((r) => setTimeout(r, 120));
      } catch (err) {
        // Mensaje de error conciso
        if (err && (err as any).response) {
          const resp = (err as any).response;
          console.error(
            `[ERROR] creando pedido para ${user.email}: status=${resp.status}`,
          );
          console.error(resp.data);
        } else {
          console.error(`[ERROR] creando pedido para ${user.email}:`, err);
        }

        // Información mínima del payload para diagnóstico
        console.error(
          `Payload fallido: user=${data.userId} direccion=${data.direccionEnvioId} subtotal=${data.subtotal} total=${data.total} items=${itemsCreate.length}`,
        );
      }
    }
  }

  console.log(`Seed de pedidos completado: ${creados} pedidos creados`);
}

seedPedidos().catch((error) => {
  console.error("Error en seed pedidos:", error);
  process.exit(1);
});

export { seedPedidos };
