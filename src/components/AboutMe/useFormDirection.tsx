import { useState } from "react";

interface Entrega {
  id: number;
  nombre: string;
  codigo: string;
  numero: string;
  pais: string;
  Sectores: string;
  ciudad: string;
  numeroCasa: string;
  direccion: string;
}

const useFormDirection = () => {
  // Estado para las direcciones
  const [entregaData, setEntregaData] = useState<Entrega[]>([
    {
      id: 1,
      nombre: "Aldo",
      codigo: "+52",
      numero: "5512345678",
      pais: "México",
      direccion: "Av. Tecnológico",
      Sectores: "Departamento 301",
      ciudad: "Morelia",
      numeroCasa: "1500",
    },
    {
      id: 2,
      nombre: "Aldo (Casa)",
      codigo: "+52",
      numero: "4431234567",
      pais: "México",
      direccion: "Calle Girasoles",
      Sectores: "Casa",
      ciudad: "Morelia",
      numeroCasa: "123",
    },
    {
      id: 3,
      nombre: "Aldo (Trabajo)",
      codigo: "+52",
      numero: "4439876543",
      pais: "México",
      direccion: "Blvd. García de León",
      Sectores: "Oficina 502",
      ciudad: "Morelia",
      numeroCasa: "2000",
    },
  ]);

  const CIUDADES = [
    "24 de abril",
    "30 de mayo",
    "Altos de Arroyo Hondo",
    "Arroyo Manzano",
    "Atala",
    "Bella Vista",
    "Buenos Aires",
    "El Cacique",
    "Centro de los Héroes",
    "Centro Olímpico",
    "Cerros de Arroyo Hondo",
    "Ciudad Colonial",
    "Ciudad Nueva",
    "Ciudad Universitaria",
    "Cristo Rey",
    "Domingo Savio",
    "El Millón",
    "Ensanche Capotillo",
    "Ensanche Espaillat",
    "Ensanche La Fe",
    "Ensanche Luperón",
    "Ensanche Naco",
    "Ensanche Quisqueya",
    "Gascue",
    "General Antonio Duverge",
    "Gualey",
    "Honduras del Norte",
    "Honduras del Oeste",
    "Jardín Botánico",
    "Jardín Zoológico",
    "Jardines del Sur",
    "Julieta Morales",
    "La Agustina",
    "La Castellana",
    "La Esperilla",
    "La Hondonada",
    "La Isabela",
    "La Julia",
    "Las Praderas",
    "La Zurza",
    "Los Cacicazgos",
    "Los Jardines",
    "Los Peralejos",
    "Los Prados",
    "Los Restauradores",
    "Los Ríos",
    "María Auxiliadora",
    "Mata Hambre",
    "Mejoramiento Social",
    "Mirador Norte",
    "Mirador Sur",
    "Miraflores",
    "Miramar",
    "Nuestra Señora de la Paz",
    "Nuevo Arroyo Hondo",
    "Palma Real",
    "Paraíso",
    "Paseo de los Indios",
    "Piantini",
    "Los Próceres",
    "Renacimiento",
    "San Carlos",
    "San Diego",
    "San Geronimo",
    "San Juan Bosco",
    "Simón Bolívar",
    "Viejo Arroyo Hondo",
    "Villas Agrícolas",
    "Villa Consuelo",
    "Villa Francisca",
    "Villa Juana",
    "otros",
  ];

  // Función para añadir nueva dirección
  const agregarDireccion = (nuevaDireccion: Entrega) => {
    setEntregaData((prev) => [...prev, nuevaDireccion]);
    console.log("Dirección agregada:", nuevaDireccion);
    console.log("Direcciónes:", entregaData);
  };

  // Función para borrar dirección por índice
  const borrarDireccionPorId = (id: number) => {
    setEntregaData((prev) => prev.filter((_, i) => i !== id));
  };
  // Función para borrar dirección por nombre (alternativa)
  const borrarDireccionPorNombre = (nombre: string) => {
    setEntregaData((prev) =>
      prev.filter((direccion) => direccion.nombre !== nombre),
    );
  };

  // Función para actualizar una dirección existente
  const actualizarDireccion = (
    index: number,
    datosActualizados: Partial<Entrega>,
  ) => {
    setEntregaData((prev) =>
      prev.map((direccion, i) =>
        i === index ? { ...direccion, ...datosActualizados } : direccion,
      ),
    );
  };

  return {
    entregaData,
    CIUDADES,
    agregarDireccion,
    borrarDireccionPorId,
    borrarDireccionPorNombre,
    actualizarDireccion,
  };
};

export default useFormDirection;
