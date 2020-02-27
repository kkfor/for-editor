# Herb Branch更新日志及临时使用指南

> 开发仓库：[HerbertHe/for-editor](https://github.com/HerbertHe/for-editor), Herb分支demo: [editor](https://server.jieec.cn/editor)。本分支新特性将实时提交PR保持与原项目的更新一致。

## 关于Herb分支

Herb分支是基于`for-editor`对于比较常见的markdown基础及部分高级特性的扩展，在原有的`marked.js`解析基础上通过自定义词法分析的方式，对`marked.js`的解析进行拓展。（对于`TeX`渲染以及`mermaid`的扩展可能并不兼容部分博客的渲染，但是语法遵循规范）

## 临时使用指南

为尊重项目所有者，分支不单独在npm发行打包，使用方法如下：

1. `npm install for-editor --save` 或 `yarn add for-editor`
2. 在项目的`node_module`文件夹中找到`for-editor`
3. 在[HerbertHe/for-editor/releases](https://github.com/HerbertHe/for-editor/releases)中找到`-herb`结尾的发行版产物*for-editor-herb-dist.zip*
4. 下载解压产物替换`dist`文件夹即可

## Commits&新增特性

- 2020-02-27
  - 完善响应式布局 [3a90ea60ca82b6eb790503d4efcd81b8d805e566](https://github.com/HerbertHe/for-editor/commit/3a90ea60ca82b6eb790503d4efcd81b8d805e566)

- 2020-02-20
  - 图标更新 [5eec53ecc24eb6cb9ead35070a7a98863ce2914a](https://github.com/HerbertHe/for-editor/commit/5eec53ecc24eb6cb9ead35070a7a98863ce2914a)
  - 处理`mermaid`渲染异常 [3282b333eea726715ae5f5cc320ca155eb482a35](https://github.com/HerbertHe/for-editor/commit/3282b333eea726715ae5f5cc320ca155eb482a35)

- 2020-02-19
  - 更新图标, 生成dist [3b25f9f4987e8faddd347487cf80816bd8ff790e](https://github.com/HerbertHe/for-editor/commit/3b25f9f4987e8faddd347487cf80816bd8ff790e)
  - 重写`mermaid`解析逻辑 [ffa952c9230112596d2ffb9df1d7f20ea9a9f5f2](https://github.com/HerbertHe/for-editor/commit/ffa952c9230112596d2ffb9df1d7f20ea9a9f5f2)

- 2020-02-18
  - 新增`折叠块`引入`mermaid` [0a57b82c54e3d918d639fefddb939828539d0eaf](https://github.com/HerbertHe/for-editor/commit/0a57b82c54e3d918d639fefddb939828539d0eaf)

- 2020-02-17
  - 生成dist [2032aeaa877c7213916fcd407d4f5bee980d330f](https://github.com/HerbertHe/for-editor/commit/2032aeaa877c7213916fcd407d4f5bee980d330f)
  - 引入`KaTeX`渲染`TeX` [6754db8f3143dfaa555f11cb088743ffce4186bf](https://github.com/HerbertHe/for-editor/commit/6754db8f3143dfaa555f11cb088743ffce4186bf)
  - 添加左工具栏功能`文本/段落` `表格` `行内代码` [46fb2f4daa09b723fe2784d36b373f2d4ed0c003](https://github.com/HerbertHe/for-editor/commit/46fb2f4daa09b723fe2784d36b373f2d4ed0c003)

- [分支基于 881399ddfd11609eab7a436085749f5b6e6d5394](https://github.com/HerbertHe/for-editor/commit/881399ddfd11609eab7a436085749f5b6e6d5394)
