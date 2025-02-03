import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import React from 'react';

const MultipleAnswersNodeView: React.FC<NodeViewProps> = props => {
  const addOption = () => {
    // Compute the insertion position at the end of the multipleAnswers container.
    const pos = props.getPos() + props.node.nodeSize - 1;
    // Insert a new multipleOption node with default content.
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
      {/* This renders the content (i.e. the list of multipleOption nodes) */}
      <NodeViewContent as="div" />
      <button onClick={addOption} style={{ marginTop: '8px' }}>
        + Add Option
      </button>
    </NodeViewWrapper>
  );
};

export default MultipleAnswersNodeView;
