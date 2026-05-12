import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,

  fonts: {
    heading: "var(--dm_sans)",
    body: "var(--outfit)",
  },

  fontSizes: {
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

  fontWeights: {
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  letterSpacings: {
    tight: "-0.02em",
    normal: "0",
    spaced: "0.02em",
    wide: "0.05em",
  },

  colors: {
    brand: {
      50:  "#F5F0FF",
      100: "#EDE0FF",
      200: "#D4BBFF",
      300: "#B794F4",
      400: "#9F7AEA",
      500: "#C026D3",
      // 500: "#7C3AED", // roxo principal
      600: "#6D28D9",
      700: "#5B21B6",
      800: "#4C1D95",
      900: "#3B0764",
    },

    accent: {
      pink:    "#D946EF",
      magenta: "#C026D3",
      purple:  "#7C3AED",
      blue:    "#3B82F6",
      cyan:    "#06B6D4",
    },

    gradient: {
      primary: "linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)",
      secondary: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)",
      card: "linear-gradient(135deg, #1e213a 0%, #12152B 100%)",
    },

    navy: {
      950: "#070f24", // body bg
      900: "#0A1330", // background principal
      800: "#12152B", // sidebar / secundário
      700: "#0B1739", // cards
      600: "#1E2340", // cards hover / inputs
      500: "#343B4F", // bordas
      400: "#2E3560", // bordas hover
    },

    grayDark: {
      900: "#080A14",
      800: "#0D0F1C",
      700: "#12152B",
      600: "#171B35",
      500: "#1E2340",
    },

    status: {
      success: "#22C55E",
      warning: "#FACC15",
      danger:  "#EF4444",
      info:    "#3B82F6",
    },
  },

  semanticTokens: {
    colors: {
      bg: {
        default:   "navy.950",
        secondary: "navy.800",
        card:      "navy.700",
        hover:     "navy.600",
      },

      text: {
        primary:   "#E8EAFF",
        secondary: "#8B90B8",
        muted:     "#AEB9E1",
      },

      border: {
        default: "navy.600",
        subtle:  "navy.500",
      },
    },
  },

  styles: {
    global: {
      body: {
        bg: "bg.default",
        color: "text.primary",
      },
      "*": {
        borderColor: "border.default",
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
          bgGradient: "linear(to-r, brand.500, accent.pink)",
          color: "white",
          _hover: {
            bgGradient: "linear(to-r, brand.600, accent.magenta)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
          },
          _active: {
            transform: "translateY(0)",
          },
          transition: "all 0.2s",
        },

        ghost: {
          color: "text.secondary",
          _hover: {
            bg: "navy.600",
            color: "text.primary",
          },
        },

        outline: {
          borderColor: "border.default",
          color: "text.primary",
          _hover: {
            bg: "navy.600",
            borderColor: "border.subtle",
          },
        },
      },
    },

    Input: {
      variants: {
        filled: {
          field: {
            bg: "navy.600",
            borderColor: "transparent",
            _hover: {
              bg: "navy.500",
              borderColor: "border.subtle",
            },
            _focus: {
              bg: "navy.600",
              borderColor: "brand.500",
              boxShadow: "0 0 0 1px #7C3AED",
            },
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },

    Select: {
      variants: {
        filled: {
          field: {
            bg: "navy.600",
            borderColor: "transparent",
            _hover: {
              bg: "navy.500",
            },
            _focus: {
              borderColor: "brand.500",
              boxShadow: "0 0 0 1px #7C3AED",
            },
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },

    Menu: {
      baseStyle: {
        list: {
          bg: "navy.800",
          borderColor: "navy.500",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          fontFamily: "body",
        },
        item: {
          bg: "navy.800",
          color: "text.secondary",
          _hover: {
            bg: "navy.600",
            color: "text.primary",
          },
          _focus: {
            bg: "navy.600",
          },
        },
      },
    },

    Modal: {
      baseStyle: {
        dialog: {
          bg: "navy.800",
          borderColor: "navy.500",
          border: "1px solid",
        },
        overlay: {
          backdropFilter: "blur(4px)",
        },
      },
    },

    Table: {
      variants: {
        simple: {
          th: {
            color: "text.muted",
            borderColor: "navy.500",
            fontSize: "xs",
            textTransform: "uppercase",
            letterSpacing: "wide",
          },
          td: {
            borderColor: "navy.500",
            fontSize: "sm",
          },
          tr: {
            _hover: {
              bg: "navy.600",
            },
          },
        },
      },
    },

    Tabs: {
      variants: {
        "soft-rounded": {
          tab: {
            color: "text.muted",
            _selected: {
              bg: "navy.600",
              color: "text.primary",
            },
          },
        },
      },
    },

    Divider: {
      baseStyle: {
        borderColor: "navy.500",
        opacity: 1,
      },
    },

    Tag: {
      baseStyle: {
        container: {
          fontSize: "xs",
          fontWeight: "medium",
        },
      },
    },
  },
});