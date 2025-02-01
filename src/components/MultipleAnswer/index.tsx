import {
  createBlockSpecFromStronglyTypedTiptapNode,
  createStronglyTypedTiptapNode,
  defaultProps,
} from '@blocknote/core';
import { Node } from '@tiptap/core';
import { MultipleAnswerExtension } from './MultipleAnswerExtension';

const MultipleAnswerOption = Node.create({
  name: 'multipleAnswerOption',
  group: 'multipleAnswerContent',
  content: 'inline*',

  addAttributes() {
    return {
      correct: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="multiple-answer-option"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        ...HTMLAttributes,
        'data-type': 'multiple-answer-option',
      },
      0,
    ];
  },
});

export const multipleAnswerPropSchema = {
  textColor: defaultProps.textColor,
  options: {
    default: JSON.stringify([
      {
        id: crypto.randomUUID(),
        text: 'Option 1',
        correct: false,
      },
    ]),
    type: 'string',
  },
};

export const MultipleAnswerContent = createStronglyTypedTiptapNode({
  name: 'multipleAnswer',
  group: 'bnBlock childContainer',
  content: 'inline*',
  priority: 40,
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div',
        getAttrs: element => {
          if (typeof element === 'string') {
            return false;
          }

          if (element.getAttribute('data-node-type') === this.name) {
            return {};
          }

          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bn-block-multiple-answer';
    wrapper.setAttribute('data-node-type', this.name);
    for (const [attribute, value] of Object.entries(HTMLAttributes)) {
      wrapper.setAttribute(attribute, value as string);
    }

    return {
      dom: wrapper,
      contentDOM: wrapper,
    };
  },
});

export const MultipleAnswer =
  createBlockSpecFromStronglyTypedTiptapNode(
    MultipleAnswerContent,
    multipleAnswerPropSchema,
    [MultipleAnswerExtension, MultipleAnswerOption],
  );
