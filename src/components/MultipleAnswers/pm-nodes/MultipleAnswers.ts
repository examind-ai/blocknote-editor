import { createStronglyTypedTiptapNode } from '@blocknote/core';

export const MultipleAnswers = createStronglyTypedTiptapNode({
  name: 'multipleAnswers',
  group: 'childContainer bnBlock blockGroupChild',
  content: 'option+', // one or more options
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
    const container = document.createElement('div');
    container.className = 'bn-block-multiple-answers';
    container.setAttribute('data-node-type', this.name);
    for (const [attribute, value] of Object.entries(HTMLAttributes)) {
      container.setAttribute(attribute, value as string);
    }

    return {
      dom: container,
      contentDOM: container,
    };
  },
});
