import { bebidaApi, platoApi, salsaApi } from "@/services/api";

export const useMenu = async () => {
  const platos = await platoApi.getAll();
  const bebidas = await bebidaApi.getAll();
  //const pedidos = await pedidoApi.getAll();
  const salsas = await salsaApi.getAll();
  //const carritos = await cartApi.getCart();
  //console.log(platos[0], bebidas[0], salsas[0]);
  // Hook logic goes here
};
