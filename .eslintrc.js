module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-undef": 0,
    "no-console": 0,
    "no-alert": 0,
    "comma-dangle": 0,
    "react/prop-types": 0,
    "no-use-before-define": 0,
    radix: 0,
    "no-param-reassign": 0,
    "react/jsx-filename-extension": 0,
    "no-mixed-operators": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "no-plusplus": 0,
    "react/prefer-stateless-function": 0,
    "class-methods-use-this": 0,
    "react/require-default-props": 0
  },
  globals: {
    module: true
  }
};
