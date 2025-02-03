import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MultipleOptionNodeView from './NodeView';

export const MultipleOption = Node.create({
  name: 'multipleOption',
  // We use group "block" because these nodes are block‐level nodes (they are children of a container)
  group: 'block',
  // Allow inline content (e.g. plain strings or styled text) within each option
  content: 'inline*',
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
    return [{ tag: 'div[data-mc-option]' }];
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

export default MultipleOption;
