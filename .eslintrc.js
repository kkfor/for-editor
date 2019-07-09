module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
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
     * jsx 中的属性必须用双引号
     * @category Stylistic Issues
     * @fixable
     */
    'jsx-quotes': ['error', 'prefer-double'],
    /**
     * 变量名必须是 camelcase 风格的
     * @category Stylistic Issues
     * @reason 很多 api 或文件名都不是 camelcase
     */
    camelcase: 'error',
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
    /**
     * 禁止出现未使用的变量
     * @category TypeScript
     * @reason 编译阶段检查就足够了
     */
    '@typescript-eslint/no-unused-vars': 'error',
    /**
     * 禁止出现没必要的 constructor
     * @category TypeScript
     */
    '@typescript-eslint/no-useless-constructor': 'error',
    /**
     * 禁止拼写错误
     */
    'react/no-typos': 'error',
    /**
     * <button> 必须有 type 属性
     * @category React
     */
    'react/button-has-type': 'error',
    /**
     * 一个 defaultProps 必须有对应的 propTypes
     * @category React
     * @reason 不强制要求写 propTypes
     */
    'react/default-props-match-prop-types': 'off',
    /**
     * render 方法中必须有返回值
     */
    'react/require-render-return': 'error',
    /**
     * style 属性的取值必须是 object
     */
    'react/style-prop-object': 'error',
    /**
     * HTML 中的自闭和标签禁止有 children
     */
    'react/void-dom-elements-no-children': 'error',
  },
}
