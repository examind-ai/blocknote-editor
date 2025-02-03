import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MultipleAnswersNodeView from './NodeView';

export const MultipleAnswers = Node.create({
  name: 'multipleAnswers',
  // Choose a group that makes sense for a container – here we use "bnBlock"
  group: 'bnBlock',
  // Expect one or more multipleOption children
  content: 'multipleOption+',
  isolating: true,

  parseHTML() {
    return [{ tag: 'div[data-multiple-answers]' }];
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

export default MultipleAnswers;
