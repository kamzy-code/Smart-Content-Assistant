"use client";

import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    keyframes: {
      glow: {
        "0%": { boxShadow: "0 0 5px #00FFFF" },
        "50%": { boxShadow: "0 0 20px #00FFFF, 0 0 30px #00FFFF" },
        "100%": { boxShadow: "0 0 5px #00FFFF" },
      },
      fadeIn: {
        "0%": { opacity: 0, transform: "translateY(20px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      shakeX: {
        "0%": { transform: "translateX(0)" },
        "25%": { transform: "translateX(-6px)" },
        "50%": { transform: "translateX(6px)" },
        "75%": { transform: "translateX(-3px)" },
        "100%": { transform: "translateX(0)" },
      },
    },
    tokens: {
      animations: {
        glow: { value: "glow 2s ease-in-out infinite" },
        fadeIn: { value: "fadeIn 0.5s ease-out forwards" },
        shakeX: { value: "shakeX 1s ease-in-out infinite" },
      },
      colors: {
        cyan: {
          50: { value: "#ecfeff" },
          100: { value: "#cffafe" },
          200: { value: "#a5f3fc" },
          300: { value: "#67e8f9" },
          400: { value: "#22d3ee" },
          500: { value: "#06b6d4" },
          600: { value: "#0891b2" },
          700: { value: "#0e7490" },
          800: { value: "#155e75" },
          900: { value: "#164e63" },
          950: { value: "#083344" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _dark: "gray.900", _light: "white" } },
          subtle: { value: { _dark: "gray.800", _light: "gray.50" } },
          muted: { value: { _dark: "gray.700", _light: "gray.100" } },
        },
        fg: {
          DEFAULT: { value: { _dark: "white", _light: "gray.900" } },
          muted: { value: { _dark: "gray.400", _light: "gray.600" } },
        },
        border: {
          DEFAULT: { value: { _dark: "gray.700", _light: "gray.200" } },
        },
        accent: {
          DEFAULT: { value: { _dark: "cyan.400", _light: "cyan.500" } },
          fg: { value: { _dark: "black", _light: "white" } },
        },
      },
    },
  },
});
