import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import './styles.css';

// Define the block types we're working with
interface MultipleAnswersBlockType {
  type: 'multipleAnswers';
  props: {
    question: string;
  };
}

interface OptionBlockType {
  type: 'option';
  props: {
    isCorrect: boolean;
  };
}

type EditorWithBlocks = BlockNoteEditor<
  Record<'multipleAnswers' | 'option', any>,
  any,
  any
>;

export const MultipleAnswersBlock = createReactBlockSpec(
  {
    type: 'multipleAnswers',
    content: 'none',
    propSchema: {
      question: {
        default: '',
        values: undefined,
      },
    },
  },
  {
    render: ({ block, editor }) => {
      const typedEditor = editor as EditorWithBlocks;

      const addOption = () => {
        const lastOption =
          block.children?.[block.children.length - 1];
        const newOption: PartialBlock = {
          type: 'option',
          props: {
            isCorrect: false,
          },
        };

        typedEditor.insertBlocks(
          [newOption],
          lastOption || block,
          lastOption ? 'after' : 'before',
        );
      };

      return (
        <div className="multiple-answers-block">
          {/* Question field */}
          <div className="question-field">
            <input
              type="text"
              value={block.props.question}
              onChange={e =>
                typedEditor.updateBlock(block, {
                  props: { ...block.props, question: e.target.value },
                })
              }
              placeholder="Enter your question..."
            />
          </div>

          {/* Options container */}
          <div className="options-container">
            {block.children?.map(optionBlock => (
              <div key={optionBlock.id} className="option-wrapper">
                <div
                  ref={el => {
                    if (el) {
                      const blockEl =
                        typedEditor.createBlockElement(optionBlock);
                      el.innerHTML = '';
                      el.appendChild(blockEl);
                    }
                  }}
                />
              </div>
            ))}
          </div>

          {/* Add option button */}
          <button className="add-option-button" onClick={addOption}>
            + Add Option
          </button>
        </div>
      );
    },
  },
);
