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
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  card: "#FFFFFF",
  shadow: "#000000",
  disabled: "#999999",
};

export const COLORS: Theme = purpleTheme;

// Gradientes para componentes específicos
export const GRADIENTS = {
  prepTime: ['#FF6B6B', '#FF8E53'],      // Tiempo de preparación (rojo-naranja)
  servings: ['#4ECDC4', '#44A08D'],      // Porciones (turquesa-verde)
  videoTutorial: ['#FF0000', '#CC0000'], // Botón YouTube (rojo brand)
  instructions: ['#9C27B0', '#673AB7'],  // Instrucciones (púrpura)
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
