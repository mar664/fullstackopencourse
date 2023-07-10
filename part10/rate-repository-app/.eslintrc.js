module.exports = {
  plugins: ["react", "react-native"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  env: {
    "react-native/react-native": true,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react/react-in-jsx-scope": "off",
  },
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
