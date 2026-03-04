// types/cart.ts

// Enums
export type TamanoPlato = "S" | "M" | "L";
export type TipoModificacion = "SIN" | "EXTRA" | "DOBLE";

// Modelos base
export interface CartItemModificacion {
  id: string;
  cartItemId: string;
  ingredienteId: string;
  tipo: TipoModificacion;
  ingrediente?: Ingrediente;
}

export interface Ingrediente {
  id: string;
  nombre: string;
  platoId: string;
  precioExtra?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Plato {
  id: string;
  nombre: string;
  descripcion?: string | null;
  imagen?: string | null;
  activo: boolean;
  calificacion: number;
  cantidadCompras: number;
  cantidadResenas: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  platoId: string;
  tamano: TamanoPlato;
  cantidad: number;
  notas?: string | null;
  createdAt: string;
  updatedAt: string;
  plato: Plato;
  modificaciones?: CartItemModificacion[];
}

export interface CartItemBebida {
  id: string;
  cartId: string;
  bebidaId: string;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
  bebida?: Bebida;
}

export interface CartItemSalsa {
  id: string;
  cartId: string;
  salsaId: string;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
  salsa?: Salsa;
}

export interface Bebida {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Salsa {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  nombre: string;
  picture?: string | null;
  googleId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Carrito con relaciones
export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  items?: CartItem[];
  bebidas?: CartItemBebida[];
  salsas?: CartItemSalsa[];
}

// Tipo para cuando el carrito viene con todas las relaciones
export interface CartConRelaciones extends Cart {
  user: User;
  items: (CartItem & {
    plato: Plato;
    modificaciones: (CartItemModificacion & {
      ingrediente: Ingrediente;
    })[];
  })[];
  bebidas: (CartItemBebida & {
    bebida: Bebida;
  })[];
  salsas: (CartItemSalsa & {
    salsa: Salsa;
  })[];
}

// Utilidades para el frontend
export interface CartResumen {
  id: string;
  userId: string;
  itemsCount: number;
  totalItems: number;
  totalPrecio: number;
  items: Array<{
    id: string;
    platoId: string;
    platoNombre: string;
    platoImagen?: string | null;
    tamano: TamanoPlato;
    cantidad: number;
    precioUnitario?: number;
    subtotal: number;
    modificaciones: Array<{
      nombre: string;
      tipo: TipoModificacion;
      precioExtra?: number;
    }>;
  }>;
  bebidas: Array<{
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
  }>;
  salsas: Array<{
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
  }>;
}

// DTOs para crear/actualizar
export interface CreateCartItemDto {
  platoId: string;
  tamano: TamanoPlato;
  cantidad?: number;
  notas?: string;
  modificaciones?: Array<{
    ingredienteId: string;
    tipo: TipoModificacion;
  }>;
}

export interface CreateCartItemBebidaDto {
  bebidaId: string;
  cantidad?: number;
}

export interface CreateCartItemSalsaDto {
  salsaId: string;
  cantidad?: number;
}

export interface UpdateCartItemDto {
  cantidad?: number;
  notas?: string;
}
