module.exports = {
  rules: {
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
    /**
     * 定义了的 jsx element 必须使用
     */
    'react/jsx-uses-vars': 'error'
  }
}