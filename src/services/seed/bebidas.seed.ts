import { faker } from "@faker-js/faker";
import { bebidaApi, API_URL } from "../api";
import type { CreateBebidaDto } from "../api";

const bebidasEjemplo = [
  { nombre: "Coca-Cola", precio: 25 },
  { nombre: "Pepsi", precio: 25 },
  { nombre: "Sprite", precio: 25 },
  { nombre: "Fanta Naranja", precio: 25 },
  { nombre: "Agua Mineral", precio: 15 },
  { nombre: "Agua con Gas", precio: 18 },
  { nombre: "Limonada Natural", precio: 30 },
  { nombre: "Naranjada Natural", precio: 30 },
  { nombre: "Té Helado", precio: 28 },
  { nombre: "Café Americano", precio: 35 },
  { nombre: "Café Latte", precio: 45 },
  { nombre: "Cappuccino", precio: 45 },
  { nombre: "Jugo de Naranja", precio: 35 },
  { nombre: "Jugo de Manzana", precio: 35 },
  { nombre: "Cerveza Nacional", precio: 40 },
  { nombre: "Cerveza Importada", precio: 55 },
  { nombre: "Vino Tinto Copa", precio: 70 },
  { nombre: "Vino Blanco Copa", precio: 70 },
  { nombre: "Margarita", precio: 85 },
  { nombre: "Mojito", precio: 85 },
];

async function seedBebidas() {
  console.log("Iniciando seed de bebidas...");
  console.log(`Usando API: ${API_URL}`);

  let creados = 0;

  // Crear bebidas de ejemplo
  for (const bebidaBase of bebidasEjemplo) {
    const bebida: CreateBebidaDto = {
      nombre: bebidaBase.nombre,
      precio: bebidaBase.precio,
      imagen: faker.image.url(),
      activo: true,
    };

    try {
      const resultado = await bebidaApi.create(bebida);
      creados++;
      console.log(`Bebida ${creados} creada: ${resultado.nombre}`);
    } catch (error) {
      console.error(`Error creando bebida "${bebidaBase.nombre}":`, error);
    }
  }

  // Crear bebidas aleatorias adicionales
  const bebidasAdicionales = 10;
  for (let i = 0; i < bebidasAdicionales; i++) {
    const bebida: CreateBebidaDto = {
      nombre: `${faker.food.adjective()} ${faker.helpers.arrayElement([
        "Soda",
        "Smoothie",
        "Shake",
        "Juice",
        "Tea",
        "Coffee",
      ])}`,
      precio: faker.number.float({ min: 20, max: 100, fractionDigits: 2 }),
      imagen: faker.image.url(),
      activo: faker.datatype.boolean({ probability: 0.9 }),
    };

    try {
      const resultado = await bebidaApi.create(bebida);
      creados++;
      console.log(`Bebida ${creados} creada: ${resultado.nombre}`);
    } catch (error) {
      console.error(`Error creando bebida aleatoria ${i + 1}:`, error);
    }
  }

  console.log(`\nSeed de bebidas completado: ${creados} bebidas creadas`);
}

seedBebidas().catch((error) => {
  console.error("Error en seed:", error);
  process.exit(1);
});

export { seedBebidas };
