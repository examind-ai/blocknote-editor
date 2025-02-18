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
        tag: 'div',
        getAttrs: element => {
          if (typeof element === 'string') {
            return false;
          }

          if (element.getAttribute('data-node-type') === this.name) {
            return {
              isCorrect:
                element.getAttribute('data-correct') === 'true',
            };
          }

          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const container = document.createElement('div');
    container.className = 'bn-block-option';
    container.setAttribute('data-node-type', this.name);
    container.setAttribute(
      'data-correct',
      String(node.attrs.isCorrect),
    );

    for (const [attribute, value] of Object.entries(HTMLAttributes)) {
      container.setAttribute(attribute, value as string);
    }

    return {
      dom: container,
      contentDOM: container,
    };
  },
});
