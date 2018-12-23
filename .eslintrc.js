module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'react-app',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'react',
    'prettier'
  ],
}