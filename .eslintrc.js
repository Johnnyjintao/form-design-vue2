module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
    parser: "babel-eslint"
  },
  "parser": "vue-eslint-parser",
  rules: {
     "no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "off",
  }
}
