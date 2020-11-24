module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  "rules": {
    "prettier/prettier": "off",
    "react-native/no-inline-styles": "off",
    "quotes": [
      "error",
      "double",
    ],
    "no-bitwise": "off",
    "indent": ["error", "tab"],
    "no-console": "off",
    "no-mixed-spaces-and-tabs": "error",
    "object-curly-spacing": ["error", "always"],
    "computed-property-spacing": ["error", "always"],
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "always-multiline",
        "imports": "never",
        "exports": "never",
        "functions": "never"
    }],
    "array-bracket-spacing": ["error", "always"],
    "react/jsx-curly-spacing": ["error", {
      "when": "always",
      "children": true,
      "allowMultiline": true,
    }],
    "react/jsx-max-props-per-line": ["error", { "maximum": 1 }],
    "react/jsx-indent-props": ["error", 'tab'],
    "react/jsx-first-prop-new-line": ["error", "always"],
  },
};
