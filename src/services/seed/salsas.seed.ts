import { faker } from "@faker-js/faker";
import { salsaApi, API_URL } from "../api";
import type { CreateSalsaDto } from "../api";

const salsasEjemplo = [
  { nombre: "Salsa Roja", precio: 0 },
  { nombre: "Salsa Verde", precio: 0 },
  { nombre: "Guacamole", precio: 15 },
  { nombre: "Pico de Gallo", precio: 0 },
  { nombre: "Salsa Habanero", precio: 5 },
  { nombre: "Salsa Chipotle", precio: 5 },
  { nombre: "Salsa Taquera", precio: 0 },
  { nombre: "Salsa Macha", precio: 10 },
  { nombre: "Crema", precio: 5 },
  { nombre: "Salsa BBQ", precio: 8 },
  { nombre: "Salsa Ranch", precio: 8 },
  { nombre: "Salsa Buffalo", precio: 8 },
  { nombre: "Mayonesa", precio: 0 },
  { nombre: "Ketchup", precio: 0 },
  { nombre: "Mostaza", precio: 0 },
];

async function seedSalsas() {
  console.log("Iniciando seed de salsas...");
  console.log(`Usando API: ${API_URL}`);

  let creados = 0;

  // Crear salsas de ejemplo
  for (const salsaBase of salsasEjemplo) {
    const salsa: CreateSalsaDto = {
      nombre: salsaBase.nombre,
      precio: salsaBase.precio,
      imagen: faker.image.url(),
      activo: true,
    };

    try {
      const resultado = await salsaApi.create(salsa);
      creados++;
      console.log(`Salsa ${creados} creada: ${resultado.nombre}`);
    } catch (error) {
      console.error(`Error creando salsa "${salsaBase.nombre}":`, error);
    }
  }

  // Crear salsas aleatorias adicionales
  const salsasAdicionales = 5;
  for (let i = 0; i < salsasAdicionales; i++) {
    const salsa: CreateSalsaDto = {
      nombre: `Salsa ${faker.food.adjective()}`,
      precio: faker.helpers.arrayElement([0, 5, 10, 15]),
      imagen: faker.image.url(),
      activo: faker.datatype.boolean({ probability: 0.9 }),
    };

    try {
      const resultado = await salsaApi.create(salsa);
      creados++;
      console.log(`Salsa ${creados} creada: ${resultado.nombre}`);
    } catch (error) {
      console.error(`Error creando salsa aleatoria ${i + 1}:`, error);
    }
  }

  console.log(`\nSeed de salsas completado: ${creados} salsas creadas`);
}

seedSalsas().catch((error) => {
  console.error("Error en seed:", error);
  process.exit(1);
});

export { seedSalsas };
