module.exports = {
  // extends: ['eslint-config-alloy/react','eslint-config-alloy/typescript'],
  extends: ['./lint/es.lint.js', './lint/react.lint.js', './lint/ts.lint.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true
    }
  },
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  rules: {
  }
}
