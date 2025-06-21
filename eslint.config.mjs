// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import nextjs from "eslint-config-next";

export default tseslint.config(
  {
    // Base ignores (add more as needed)
    ignores: [
      ".next", 
      "dist",
      "node_modules"
    ]
  },
  {
    // Next.js base configuration
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      nextjs
    ],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022, // Updated to 2022
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        project: true, // Enable TS project mode
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      // React/Next.js specific rules
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      
      // Custom rules
      "react-hooks/exhaustive-deps": "warn",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn"
    }
  },
  // Optional: Add another config object for non-TypeScript files if needed
  {
    files: ["**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser
    }
  }
);