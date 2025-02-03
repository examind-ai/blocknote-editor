// MultipleAnswers.ts
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MultipleAnswersNodeView from './NodeView';

const MultipleAnswersNode = Node.create({
  name: 'multipleAnswers',
  group: 'block',
  content: 'multipleOption+', // One or more options
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-multiple-answers]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-multiple-answers': true,
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MultipleAnswersNodeView);
  },
});

export default MultipleAnswersNode;
