import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import './styles.css';

export const MultipleAnswersReactComponent = createReactBlockSpec(
  {
    type: 'multipleAnswers',
    content: 'none',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      backgroundColor: defaultProps.backgroundColor,
      question: {
        default: '',
      },
    },
  },
  {
    render: ({ block, editor, contentRef }) => {
      const addOption = () => {
        const lastOption =
          block.children?.[block.children.length - 1];

        editor.insertBlocks(
          [
            {
              type: 'option',
              props: {
                textAlignment: defaultProps.textAlignment.default,
                textColor: defaultProps.textColor.default,
                backgroundColor: defaultProps.backgroundColor.default,
                isCorrect: false,
              },
            } as any,
          ],
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
                editor.updateBlock(block, {
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
                <div className="option-content" ref={contentRef} />
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
