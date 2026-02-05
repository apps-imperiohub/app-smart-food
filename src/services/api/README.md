````markdown
# SDK HTTP (prisma/api)

Esta carpeta ofrece un cliente HTTP tipado para consumir la API desde el frontend o como SDK local.

## Convenciones importantes

- Todas las funciones de este SDK esperan que la respuesta del servidor tenga la forma:

  ```json
  { "message": "...", "data": ... }
  ```
````

Por ello el SDK devuelve `response.data.data` en todas las rutas.

- Los timestamps (`createdAt`, `updatedAt`) están tipados como `string` (ISO) en las definiciones.
- Los precios pueden venir como `string` (serialización de Decimal desde el backend). Conviene acordar si el backend convierte a `number` o mantener `string` y parsear en el frontend.

## Uso rápido

- Importar el cliente por defecto (ya configurado con `process.env.API_URL`):

```ts
import { apiClient } from "./prisma/api";
```

- Crear un cliente con `baseURL` personalizado (recomendado en el browser):

```ts
import { createApiClient } from "./prisma/api";

const client = createApiClient("https://mi-api.example.com");
// usar client.get/post/put...
```

## Uso del SDK (APIs tipadas)

```ts
import { bebidaApi } from "./prisma/api";

const bebidas = await bebidaApi.getAll();
const bebida = await bebidaApi.getById("id-de-ejemplo");
```

## WebSocket - Actualizaciones en tiempo real

### 1. Instalación de Socket.IO Client

```bash
npm install socket.io-client
```

### 2. Conectar al servidor WebSocket

```ts
import { io } from "socket.io-client";

// Conectar con autenticación
const socket = io("http://tu-api.com", {
  auth: {
    token: "tu-jwt-token", // El mismo token usado en REST API
  },
});
```

### 3. Suscribirse a actualizaciones de pedidos

```ts
// Suscribirse a un pedido específico
socket.emit("joinRoom", `pedido:${pedidoId}`);

// Escuchar cambios en tiempo real
socket.on("pedidoUpdated", (pedido) => {
  console.log("Pedido actualizado:", pedido);
  // Actualizar tu UI aquí
});

// Al salir de la vista (cleanup)
socket.emit("leaveRoom", `pedido:${pedidoId}`);
socket.off("pedidoUpdated");
```

### 4. Ejemplo completo de uso en React

```tsx
import { useEffect } from "react";
import { io } from "socket.io-client";

function PedidoDetail({ pedidoId, token }) {
  useEffect(() => {
    const socket = io("http://tu-api.com", {
      auth: { token },
    });

    // Suscribirse al pedido
    socket.emit("joinRoom", `pedido:${pedidoId}`);

    // Escuchar actualizaciones
    socket.on("pedidoUpdated", (pedido) => {
      // Actualizar estado local con el pedido actualizado
      setPedido(pedido);
    });

    // Cleanup al desmontar
    return () => {
      socket.emit("leaveRoom", `pedido:${pedidoId}`);
      socket.disconnect();
    };
  }, [pedidoId, token]);

  return <div>{/* Tu UI */}</div>;
}
```

### Eventos disponibles

| Evento          | Dirección        | Descripción                      |
| --------------- | ---------------- | -------------------------------- |
| `joinRoom`      | Cliente → Server | Suscribirse a actualizaciones    |
| `leaveRoom`     | Cliente → Server | Cancelar suscripción             |
| `pedidoUpdated` | Server → Cliente | Notificación de cambio en pedido |

### Convención de salas (rooms)

Las salas siguen el patrón `entidad:id`:

- `pedido:abc123` - Actualizaciones de un pedido específico
- `user:userId` - Notificaciones personales del usuario
- `cart:cartId` - Cambios en carrito en tiempo real

## Publicación futura

- Para convertir esto en un paquete npm: añadir `package.json` en esta carpeta, compilar con `tsc` a módulos ES, generar `.d.ts` y publicar. También considerar un bundler para generar un build UMD/ESM listo para navegador.

## Notas finales

- El SDK usa `axios`; el bundler del frontend (Vite/webpack) debe resolver esa dependencia. Si quieres un único bundle sin dependencias, puedo generar un build empaquetado.
- Para WebSocket, asegúrate de desconectar el socket cuando el componente se desmonte para evitar fugas de memoria.

```

```
