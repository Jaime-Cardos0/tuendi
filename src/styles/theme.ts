"use client"
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,

  fonts: {
    heading: "var(--font-poppins), monospace",
    body: "var(--font-dm_sans), sans-serif",
    mono: "var(--font-outfit), sans-serif",
  },

  fontSizes:{
    sxs: "11px",
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
  },

  fontWeights:{
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights:{
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  letterSpacings:{
    tight: "-0.02em",
    normal: "0",
    wide: "0.05em"
  },

  colors: {
    brand: {
      50: "#EEF2FF",
      100: "#E0E7FF",
      200: "#C7D2FE",
      300: "#A5B4FC",
      400: "#818CF8",
      500: "#6366F1", // roxo principal
      600: "#4F46E5",
      700: "#4338CA",
      800: "#3730A3",
      900: "#312E81",
    },

    blueAccent: {
      500: "#3B82F6",
      600: "#2563EB",
    },

    grayDark: {
      900: "#0F1117", // background
      800: "#151821", // secundário
      700: "#1B1F2A", // cards
      600: "#222634",
      500: "#2A2F3D",
    },

    status: {
      success: "#22C55E",
      warning: "#FACC15",
      danger: "#EF4444",
      info: "#3B82F6",
    },
  },

  semanticTokens: {
    colors: {
      bg: {
        default: "grayDark.900",
        secondary: "grayDark.800",
        card: "grayDark.700",
      },

      text: {
        primary: "#E6EAF2",
        secondary: "#A0A7B8",
        muted: "#6B7280",
      },

      border: {
        default: "grayDark.500",
      },
    },
  },

  styles: {
    global: {
      body: {
        bg: "bg.default",
        color: "text.primary",
      },
    },
  },

  components: {
    Card: {
      baseStyle: {
        container: {
          bg: "bg.card",
          borderRadius: "xl",
          border: "1px solid",
          borderColor: "border.default",
        },
      },
    },

    Button: {
      variants: {
        gradient: {
          bgGradient: "linear(to-r, blueAccent.500, brand.500)",
          color: "white",
          _hover: {
            bgGradient: "linear(to-r, blueAccent.600, brand.600)",
          },
        },
      },
    },

    Input: {
      variants: {
        filled: {
          field: {
            bg: "bg.card",
            _hover: { bg: "grayDark.600" },
            _focus: { bg: "grayDark.600" },
          },
        },
      },
    },
  },
});