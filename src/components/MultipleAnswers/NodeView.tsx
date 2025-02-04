import React from 'react';
import {
  NodeViewWrapper,
  NodeViewContent,
  NodeViewProps,
} from '@tiptap/react';

const MultipleAnswersNodeView: React.FC<NodeViewProps> = props => {
  const addOption = () => {
    // Compute insertion position at the end of this container.
    const pos = props.getPos() + props.node.nodeSize - 1;
    // Insert a new multipleOption node with default inline content.
    // (Using a plain string as inline content.)
    props.editor.commands.insertContentAt(pos, {
      type: 'multipleOption',
      content: [
        {
          type: 'text',
          text: 'New Option',
        },
      ],
    });
  };

  return (
    <NodeViewWrapper className="multiple-answers-container">
      {/* Render the children (multipleOption nodes) */}
      <NodeViewContent as="div" />
      <button onClick={addOption} style={{ marginTop: '8px' }}>
        + Add Option
      </button>
    </NodeViewWrapper>
  );
};

export default MultipleAnswersNodeView;
