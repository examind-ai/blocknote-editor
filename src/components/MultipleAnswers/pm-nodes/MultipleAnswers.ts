import { createStronglyTypedTiptapNode } from '@blocknote/core';

export const MultipleAnswers = createStronglyTypedTiptapNode({
  name: 'multipleAnswers',
  group: 'block',
  content: 'blockContainer+',
  priority: 40,
  defining: true,

  addAttributes() {
    return {
      question: {
        default: '',
        parseHTML: element =>
          element.getAttribute('data-question') || '',
        renderHTML: attributes => ({
          'data-question': attributes.question,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="multiple-answers"]',
        getAttrs: element => {
          if (typeof element === 'string') {
            return false;
          }

          return {
            question: element.getAttribute('data-question') || '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const container = document.createElement('div');
    container.className = 'bn-block-multiple-answers';
    container.setAttribute('data-type', 'multiple-answers');
    container.setAttribute(
      'data-question',
      node.attrs.question || '',
    );

    for (const [attribute, value] of Object.entries(HTMLAttributes)) {
      if (attribute !== 'data-question') {
        container.setAttribute(attribute, value as string);
      }
    }

    return {
      dom: container,
      contentDOM: container,
    };
  },
});
