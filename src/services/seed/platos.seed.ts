import { faker } from "@faker-js/faker";
import { platoApi, API_URL } from "../api";
import type {
  CreatePlatoDto,
  PlatoTamanoInput,
  IngredienteInput,
  TamanoPlato,
} from "../api";

const platosEjemplo = [
  { nombre: "Tacos al Pastor", categoria: "mexicana" },
  { nombre: "Pizza Margherita", categoria: "italiana" },
  { nombre: "Sushi Roll", categoria: "japonesa" },
  { nombre: "Hamburguesa Clásica", categoria: "americana" },
  { nombre: "Pad Thai", categoria: "tailandesa" },
  { nombre: "Paella Valenciana", categoria: "española" },
  { nombre: "Ceviche", categoria: "peruana" },
  { nombre: "Ramen", categoria: "japonesa" },
  { nombre: "Falafel", categoria: "árabe" },
  { nombre: "Enchiladas", categoria: "mexicana" },
];

const ingredientesComunes = [
  "Cebolla",
  "Tomate",
  "Ajo",
  "Cilantro",
  "Queso",
  "Aguacate",
  "Jalapeño",
  "Limón",
  "Sal",
  "Pimienta",
  "Aceite de oliva",
  "Pollo",
  "Carne de res",
  "Cerdo",
  "Camarón",
];

function generarPrecios(): PlatoTamanoInput[] {
  const precioBase = faker.number.float({
    min: 50,
    max: 150,
    fractionDigits: 2,
  });
  const tamanos: TamanoPlato[] = ["S", "M", "L"];

  return tamanos.map((tamano, index) => ({
    tamano,
    precio: Math.round(precioBase * (1 + index * 0.3) * 100) / 100,
  }));
}

function generarIngredientes(): IngredienteInput[] {
  const cantidad = faker.number.int({ min: 3, max: 7 });
  const ingredientesSeleccionados = faker.helpers.arrayElements(
    ingredientesComunes,
    cantidad,
  );

  return ingredientesSeleccionados.map((nombre) => ({
    nombre,
    precioExtra: faker.datatype.boolean()
      ? faker.number.float({ min: 5, max: 25, fractionDigits: 2 })
      : null,
  }));
}

async function seedPlatos() {
  console.log("Iniciando seed de platos...");
  console.log(`Usando API: ${API_URL}`);

  let creados = 0;

  // Crear platos de ejemplo
  for (const platoBase of platosEjemplo) {
    const plato: CreatePlatoDto = {
      nombre: platoBase.nombre,
      descripcion: faker.lorem.sentence({ min: 5, max: 15 }),
      imagen: faker.image.url(),
      activo: true,
      precios: generarPrecios(),
      ingredientes: generarIngredientes(),
    };

    try {
      const resultado = await platoApi.create(plato);
      creados++;
      console.log(`Plato ${creados} creado: ${resultado.nombre}`);
    } catch (error) {
      console.error(`Error creando plato "${platoBase.nombre}":`, error);
    }
  }

  // Crear platos aleatorios adicionales
  const platosAdicionales = 40;
  for (let i = 0; i < platosAdicionales; i++) {
    const plato: CreatePlatoDto = {
      nombre: faker.food.dish(),
      descripcion: faker.lorem.sentence({ min: 5, max: 15 }),
      imagen: faker.image.url(),
      activo: faker.datatype.boolean({ probability: 0.9 }),
      precios: generarPrecios(),
      ingredientes: generarIngredientes(),
    };

    try {
      const resultado = await platoApi.create(plato);
      creados++;
      console.log(`Plato ${creados} creado: ${resultado.nombre}`);
    } catch (error) {
      console.error(`Error creando plato aleatorio ${i + 1}:`, error);
    }
  }

  console.log(`\nSeed de platos completado: ${creados} platos creados`);
}

seedPlatos().catch((error) => {
  console.error("Error en seed:", error);
  process.exit(1);
});

export { seedPlatos };
