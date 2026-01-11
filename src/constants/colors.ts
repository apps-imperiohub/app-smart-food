/**
 * SISTEMA DE COLORES CENTRALIZADO
 *
 * Este archivo contiene TODOS los colores usados en la aplicación.
 *
 * Estructura:
 * - COLORS: Tema principal de la aplicación
 * - GRADIENTS: Gradientes de LinearGradient para componentes específicos
 * - TRANSPARENCY: Valores de transparencia estandarizados (negro y blanco)
 * - OVERLAY: Overlays para sombras y efectos
 *
 * ⚠️ IMPORTANTE: NO usar colores hardcodeados fuera de este archivo.
 * Siempre importar desde aquí.
 */

interface Theme {
  primary: string;
  background: string;
  text: string;
  border: string;
  white: string;
  textLight: string;
  card: string;
  shadow: string;
  disabled: string;
}

const purpleTheme: Theme = {
  primary: "#E53935",
  background: "#FAFAFA",
  text: "#1A1A1A",
  border: "#E0E0E0",
  white: "#FFFFFF",
  textLight: "#757575",
  card: "#FFFFFF",
  shadow: "#000000",
  disabled: "#BDBDBD",
};

export const COLORS: Theme = purpleTheme;

// Gradientes para componentes específicos
export const GRADIENTS = {
  prepTime: ['#FF5252', '#FF7043'],      // Tiempo de preparación (rojo-naranja)
  servings: ['#FFC107', '#FFB300'],      // Porciones (amarillo dorado)
  videoTutorial: ['#FF0000', '#CC0000'], // Botón YouTube (rojo brand)
  instructions: ['#E53935', '#D32F2F'],  // Instrucciones (rojo marca)
} as const;

// Transparencias estandarizadas
export const TRANSPARENCY = {
  blackExtraLight: 'rgba(0, 0, 0, 0.05)',
  blackLight: 'rgba(0, 0, 0, 0.3)',
  blackMedium: 'rgba(0, 0, 0, 0.5)',
  blackDark: 'rgba(0, 0, 0, 0.75)',
  blackExtraDark: 'rgba(0, 0, 0, 0.8)',
  blackAlmostOpaque: 'rgba(0, 0, 0, 0.9)',
  whiteLight: 'rgba(255, 255, 255, 0.05)',
  whiteDark: 'rgba(255, 255, 255, 0.8)',
} as const;

// Overlays para sombras y efectos
export const OVERLAY = {
  featured: 'rgba(0, 0, 0, 0.3)',
  textShadowLight: 'rgba(0, 0, 0, 0.3)',
  textShadowDark: 'rgba(0, 0, 0, 0.75)',
} as const;

// Constante para transparente
export const TRANSPARENT = 'transparent' as const;
