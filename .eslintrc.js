module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
