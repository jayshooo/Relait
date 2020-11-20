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
    "no-console": "off",
    "no-mixed-spaces-and-tabs": "error",
    "react/jsx-curly-spacing": ["error", "always", { allowMultiline: true }],
    "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
    "react/jsx-indent-props": [1, 'tab'],
    "object-curly-spacing": ["error", "always"],
    "computed-property-spacing": ["error", "always"],
    "react/jsx-first-prop-new-line": [1, "always"],
  },
};
