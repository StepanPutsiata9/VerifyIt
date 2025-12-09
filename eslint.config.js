const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const reactNativePlugin = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", "build/*", ".expo/*"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "react": reactPlugin,
      "react-native": reactNativePlugin
    },
    rules: {

      "@typescript-eslint/no-unused-vars": "error",


      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      "react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "error",

      "no-unused-vars": "off",
    },
  },
]);