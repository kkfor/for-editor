module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
  },
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    /**
     * 结尾不带分号
     * @category Stylistic Issues
     * @fixable
     */
    semi: [
      'error',
      'never',
      {
        beforeStatementContinuationChars: 'always',
      },
    ],
    /**
     * 必须使用单引号，禁止使用双引号
     * @category Stylistic Issues
     * @fixable
     */
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    /**
     * 禁止使用 console
     * @category Possible Errors
     * @reason console 的使用很常见
     */
    'no-console': 'error',
    /**
     * 禁止使用 debugger
     * @category Possible Errors
     */
    'no-debugger': 'error',
    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
     * @category Best Practices
     * @fixable
     */
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    /**
     * 禁止使用 alert
     * @category Best Practices
     * @reason alert 很常用
     */
    'no-alert': 'error',
  },
}
