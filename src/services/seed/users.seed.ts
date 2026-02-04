import { faker } from "@faker-js/faker";
import { userDB } from "../../src/db";
import prisma from "../../src/db/prisma.db";

async function seedUsers() {
  console.log("Iniciando seed de usuarios...");

  for (let i = 0; i < 100; i++) {
    const user = await userDB.createUser({
      email: faker.internet.email(),
      nombre: faker.person.fullName(),
      picture: faker.image.avatar(),
      googleId: faker.string.uuid(),
    });

    // Crear una dirección de envío para el usuario
    try {
      const direccion = await prisma.direccionEnvio.create({
        data: {
          userId: user.id,
          nombreContacto: user.nombre,
          telefono: faker.phone.number(),
          pais: "República Dominicana",
          ciudad: faker.location.city(),
          sector: faker.location.state(),
          calle: faker.location.street(),
          numero: String(faker.number.int({ min: 1, max: 300 })),
          detalles: faker.location.secondaryAddress(),
          isDefault: true,
        },
      });

      console.log(
        `Usuario ${i + 1} creado: ${user.email} (direccion: ${direccion.ciudad})`,
      );
    } catch (err) {
      console.error(`Error creando dirección para usuario ${user.email}:`, err);
    }
  }

  console.log("Seed de usuarios completado: 100 usuarios creados");
}

seedUsers().catch((error) => {
  console.error("Error en seed:", error);
  process.exit(1);
});
export { seedUsers };
