module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "jest/globals": true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
  },
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'jest',
    'react',
    'prettier'
  ],
  rules: {
    'react/prop-types': 0,
    'no-console': 0
  }
}