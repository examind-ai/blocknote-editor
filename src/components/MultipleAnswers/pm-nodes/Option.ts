import { createStronglyTypedTiptapNode } from '@blocknote/core';

export const Option = createStronglyTypedTiptapNode({
  name: 'option',
  group: 'block',
  content: 'inline*',
  priority: 50,
  defining: true,

  addAttributes() {
    return {
      isCorrect: {
        default: false,
        parseHTML: element =>
          element.getAttribute('data-correct') === 'true',
        renderHTML: attributes => ({
          'data-correct': attributes.isCorrect,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="option"]',
        getAttrs: element => {
          if (typeof element === 'string') {
            return false;
          }

          return {
            isCorrect:
              element.getAttribute('data-correct') === 'true',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const container = document.createElement('div');
    container.className = 'bn-block-option';
    container.setAttribute('data-type', 'option');
    container.setAttribute(
      'data-correct',
      String(node.attrs.isCorrect),
    );

    for (const [attribute, value] of Object.entries(HTMLAttributes)) {
      if (attribute !== 'data-correct') {
        container.setAttribute(attribute, value as string);
      }
    }

    return {
      dom: container,
      contentDOM: container,
    };
  },
});
