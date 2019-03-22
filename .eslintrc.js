module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },
  env: {
    node: true,
    browser: true,
    jest: true
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  rules: {
    "@typescript-eslint/explicit-member-accessibility": "off",
    /* Disable React rules that conflict with TypeScript */
    "react/prop-types": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }],

    /* Team Rules */
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off",

    // This requires return types for React components which is overhead for little benefit
    "@typescript-eslint/explicit-function-return-type": "off",

    // Jest (among others) still require CommonJS syntax
    "@typescript-eslint/no-var-requires": "off",
    "explicit-function-return-type": "off",

    // Team convention prefers named exports
    "import/prefer-default-export": "off"
  },
  settings: {
    "import/resolver": {
      node: {
        /* Which extensions should be left off import statements */
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
      }
    }
  }
};
