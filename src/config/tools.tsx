import React from 'react'

export default (lang, editor) => [
  {
    key: 'undo',
    title: lang.undo,
    text: <i className="foricon for-undo"></i>,
    type: 'editor-method',
    command: 'undo'
  },
  {
    key: 'redo',
    title: lang.redo,
    text: <i className="foricon for-redo"></i>,
    type: 'editor-method',
    command: 'redo'
  },
  {
    key: 'expand',
    title: lang.fullscreen,
    text: <i className={editor.state.isFullscreen ? 'foricon for-expand' : 'foricon for-expand'}></i>,
    type: 'editor-method',
    command: 'toggleFullscreen'
  },
  {
    key: 'preview',
    title: lang.fullscreen,
    text: <i className={editor.state.isFullscreen ? 'foricon for-eye' : 'foricon for-eye'}></i>,
    type: 'editor-method',
    command: 'togglePreview'
  },
  {
    key: 'subfield',
    title: lang.fullscreen,
    text: <i className={editor.state.isFullscreen ? 'foricon for-expand' : 'foricon for-expand'}></i>,
    type: 'editor-method',
    command: 'toggleSubfield'
  },
]