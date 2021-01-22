module.exports = {
  env: {
    browser: true,
    node: true,
    jquery: false,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'class-methods-use-this': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    "no-param-reassign": 0,
  },
};
