import {
  createBlockSpecFromStronglyTypedTiptapNode,
  createDefaultBlockDOMOutputSpec,
  createStronglyTypedTiptapNode,
  defaultProps,
  mergeCSSClasses,
} from '@blocknote/core';
import { Node } from '@tiptap/core';
import { Node as PMNode } from 'prosemirror-model';
import { MultipleAnswerExtension } from './MultipleAnswerExtension';

// MultipleAnswerOption.ts
const MultipleAnswerOption = Node.create({
  name: 'multipleAnswerOption',
  group: 'multipleAnswerContent',
  content: 'inline*',

  addAttributes() {
    return {
      correct: {
        default: false,
        parseHTML: element =>
          element.getAttribute('data-correct') === 'true',
        renderHTML: attributes => ({
          'data-correct': attributes.correct,
        }),
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
  content: 'inline*',
  group: 'blockContent',

  parseHTML() {
    return [{ tag: 'div[data-type="multiple-answer"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return createDefaultBlockDOMOutputSpec(
      this.name,
      'div',
      {
        'data-type': 'multiple-answer',
        ...(this.options.domAttributes?.blockContent || {}),
        ...HTMLAttributes,
      },
      this.options.domAttributes?.inlineContent || {},
    );
  },

  addAttributes() {
    return {
      options: {
        default: [],
        parseHTML: element => {
          const data = element.getAttribute('data-options');
          return data ? JSON.parse(data) : [];
        },
        renderHTML: attributes => ({
          'data-options': JSON.stringify(attributes.options),
        }),
      },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes, editor }) => {
      class MultipleAnswerView {
        dom: HTMLElement;
        contentDOM: HTMLElement;

        constructor(
          node: PMNode,
          blockContentHTMLAttributes: Record<string, string>,
        ) {
          const wrapper = document.createElement('div');
          wrapper.className = mergeCSSClasses(
            'bn-block-content',
            blockContentHTMLAttributes.class,
          );

          // Create options container
          const optionsContainer = document.createElement('div');
          optionsContainer.className = 'multiple-answer-options';

          // Parse the options from JSON string
          const options = JSON.parse(node.attrs.options || '[]');

          options.forEach((option: any) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'multiple-answer-option';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = option.correct;
            checkbox.addEventListener('change', () => {
              const newOptions = options.map((opt: any) =>
                opt.id === option.id
                  ? { ...opt, correct: checkbox.checked }
                  : opt,
              );
              editor.commands.updateAttributes('multipleAnswer', {
                options: JSON.stringify(newOptions), // Stringify before updating
              });
            });

            const text = document.createElement('div');
            text.contentEditable = 'true';
            text.textContent = option.text;
            text.addEventListener('input', () => {
              const newOptions = options.map((opt: any) =>
                opt.id === option.id
                  ? { ...opt, text: text.textContent || '' }
                  : opt,
              );
              editor.commands.updateAttributes('multipleAnswer', {
                options: JSON.stringify(newOptions), // Stringify before updating
              });
            });

            optionDiv.appendChild(checkbox);
            optionDiv.appendChild(text);
            optionsContainer.appendChild(optionDiv);
          });

          wrapper.appendChild(optionsContainer);

          this.dom = wrapper;
          this.contentDOM = optionsContainer;
        }
      }

      return new MultipleAnswerView(node, {
        ...(this.options.domAttributes?.blockContent || {}),
        ...HTMLAttributes,
      });
    };
  },
});

export const MultipleAnswer =
  createBlockSpecFromStronglyTypedTiptapNode(
    MultipleAnswerContent,
    multipleAnswerPropSchema,
    [MultipleAnswerExtension, MultipleAnswerOption],
  );
