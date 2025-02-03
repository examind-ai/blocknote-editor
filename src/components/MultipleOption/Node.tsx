// MultipleOption.ts
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MultipleOptionNodeView from './NodeView';

const MultipleOptionNode = Node.create({
  name: 'multipleOption',
  group: 'block',
  content: 'inline*', // Allows rich text with inline content (mentions, formatting, etc.)
  inline: false,
  isolating: true,

  addAttributes() {
    return {
      correct: {
        default: false,
        parseHTML: element =>
          element.getAttribute('data-correct') === 'true',
        renderHTML: attributes => ({
          'data-correct': attributes.correct ? 'true' : 'false',
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-mc-option]', // reusing this selector name for consistency
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-mc-option': true }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MultipleOptionNodeView);
  },
});

export default MultipleOptionNode;
