module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier", // Make sure to keep this at the end of the list to allow Prettier to properly work with ESlint.,
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  ignorePatterns: [
    "packages/**/*/coverage",
    "packages/**/*/dist",
    "packages/**/*/node_modules",
    "packages/client/src/talismanfailure.js",
    "packages/**/*/storybook-static",
    "packages/**/*/dist",
  ],
  rules: {
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx", ".ts"] },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-use-before-define": "off",
    "import/extensions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: [
          "node_modules",
          "src"
        ]
      },
    },
  },
};
