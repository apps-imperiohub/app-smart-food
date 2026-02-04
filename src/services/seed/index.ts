import { seedBebidas } from "./bebidas.seed";
import { seedCarritos } from "./carrito.seed";
import { seedPlatos } from "./platos.seed";
import { seedSalsas } from "./salsas.seed";
import { seedUsers } from "./users.seed";

const runSeeds = async () => {
  try {
    await seedUsers();
    await seedBebidas();
    await seedCarritos();
    await seedPlatos();
    await seedSalsas();
    console.log("All seeds executed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeds:", error);
    process.exit(1);
  }
};

runSeeds();
