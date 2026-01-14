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
  button: string;
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
  button: "#f6d40f",
};

export const COLORS: Theme = purpleTheme;

// Gradientes para componentes específicos
export const GRADIENTS = {
  prepTime: ["#FF5252", "#FF7043"], // Tiempo de preparación (rojo-naranja)
  servings: ["#FFC107", "#FFB300"], // Porciones (amarillo dorado)
  videoTutorial: ["#FF0000", "#CC0000"], // Botón YouTube (rojo brand)
  instructions: ["#E53935", "#D32F2F"], // Instrucciones (rojo marca)
} as const;

// Transparencias estandarizadas
export const TRANSPARENCY = {
  blackExtraLight: "rgba(0, 0, 0, 0.05)",
  blackLight: "rgba(0, 0, 0, 0.3)",
  blackMedium: "rgba(0, 0, 0, 0.5)",
  blackDark: "rgba(0, 0, 0, 0.75)",
  blackExtraDark: "rgba(0, 0, 0, 0.8)",
  blackAlmostOpaque: "rgba(0, 0, 0, 0.9)",
  whiteLight: "rgba(255, 255, 255, 0.05)",
  whiteDark: "rgba(255, 255, 255, 0.8)",
} as const;

// Overlays para sombras y efectos
export const OVERLAY = {
  featured: "rgba(0, 0, 0, 0.3)",
  textShadowLight: "rgba(0, 0, 0, 0.3)",
  textShadowDark: "rgba(0, 0, 0, 0.75)",
} as const;

// Sombras para tarjetas y elementos elevados
export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
} as const;
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999, // Para círculos perfectos
  round: 50, // Para elementos redondeados
} as const;

export const PADDING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
} as const;

// Constante para transparente
export const TRANSPARENT = "transparent" as const;

// Tipos de texto (tipografía)
export const TEXT_TYPES = {
  // Títulos
  title: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 40,
  },
  titleLarge: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 36,
  },
  titleMedium: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 32,
  },
  titleSmall: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },

  // Subtítulos
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  subtitleMedium: {
    fontSize: 16,
    fontWeight: "500" as const,
    lineHeight: 22,
  },

  // Cuerpo de texto
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },

  // Texto destacado
  bodyBold: {
    fontSize: 16,
    fontWeight: "700" as const,
    lineHeight: 24,
  },
  bodyMediumBold: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 20,
  },

  // Texto pequeño (captions, labels)
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: "600" as const,
    lineHeight: 16,
  },
  label: {
    fontSize: 10,
    fontWeight: "500" as const,
    lineHeight: 14,
  },

  // Botones
  button: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 20,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 18,
  },
} as const;
