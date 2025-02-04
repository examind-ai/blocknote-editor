import React from 'react';
import {
  NodeViewWrapper,
  NodeViewContent,
  NodeViewProps,
} from '@tiptap/react';

const MultipleOptionNodeView: React.FC<NodeViewProps> = props => {
  const { node, updateAttributes, editor } = props;

  const toggleCorrect = () => {
    updateAttributes({ correct: !node.attrs.correct });
  };

  const deleteOption = () => {
    // Deletes this option node.
    editor.commands.deleteNode(node.type);
  };

  return (
    <NodeViewWrapper className="multiple-option">
      <input
        type="checkbox"
        checked={node.attrs.correct}
        onChange={toggleCorrect}
      />
      {/* Renders the inline content of this option */}
      <NodeViewContent as="div" className="multiple-option-content" />
      <button onClick={deleteOption} style={{ marginLeft: '8px' }}>
        Delete
      </button>
    </NodeViewWrapper>
  );
};

export default MultipleOptionNodeView;
