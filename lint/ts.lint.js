module.exports = {
  rules: {
    'no-unused-vars': 'off',
    /**
     * 接口名称必须已 I 开头
     * @category TypeScript
     */
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    /**
     * 禁止出现未使用的变量
     * @category TypeScript
     * @reason 编译阶段检查就足够了
     */
    '@typescript-eslint/no-unused-vars': 'error',
    /**
     * 类型定义的冒号前面必须没有空格，后面必须有一个空格
     * @category TypeScript
     * @fixable
     */
    '@typescript-eslint/type-annotation-spacing': 'error',
    /**
     * 接口和类型别名的成员之间必须使用分号分隔
     * @category TypeScript
     * @fixable
     */
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none'
        }
      }
    ],
    /**
     * 禁止定义空的接口
     * @category TypeScript
     */
    '@typescript-eslint/no-empty-interface': 'error',
    /**
     * 禁止出现没必要的 constructor
     * @category TypeScript
     */
    '@typescript-eslint/no-useless-constructor': 'error',
    /**
     * 指定类成员的排序规则
     * @category TypeScript
     * @reason 优先级：
     * 1. static > instance
     * 2. field > constructor > method
     * 3. public > protected > private
     */
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method'
        ]
      }
    ]
  }
}
