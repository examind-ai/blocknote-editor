import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';

export const OptionReactComponent = createReactBlockSpec(
  {
    type: 'option',
    content: 'inline', // This block will have rich text content
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      backgroundColor: defaultProps.backgroundColor,
      isCorrect: {
        default: false,
      },
    },
  },
  {
    render: ({ block, editor, contentRef }) => {
      return (
        <div className="option-block">
          {/* Selection indicator */}
          <div
            className={`selection-indicator ${block.props.isCorrect ? 'selected' : ''}`}
            onClick={() =>
              editor.updateBlock(block, {
                props: {
                  ...block.props,
                  isCorrect: !block.props.isCorrect,
                },
              })
            }
          />

          {/* Rich text content area */}
          <div className="option-content" ref={contentRef} />

          {/* Delete button */}
          <button
            className="delete-option"
            onClick={() => {
              editor.removeBlocks([block]);
            }}
          >
            🗑️
          </button>
        </div>
      );
    },
  },
);
