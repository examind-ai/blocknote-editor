// MultipleOptionNodeView.tsx
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import React from 'react';

const MultipleOptionNodeView: React.FC<NodeViewProps> = props => {
  const { node, updateAttributes, editor } = props;

  const toggleCorrect = () => {
    updateAttributes({ correct: !node.attrs.correct });
  };

  const deleteOption = () => {
    // The deleteNode command expects a node type or name.
    // Here we pass the node's type directly.
    editor.commands.deleteNode(node.type);
  };

  return (
    <NodeViewWrapper className="multiple-option">
      <input
        type="checkbox"
        checked={node.attrs.correct}
        onChange={toggleCorrect}
      />
      {/* Renders the rich text content */}
      <NodeViewContent as="div" className="multiple-option-content" />
      <button onClick={deleteOption} style={{ marginLeft: '8px' }}>
        Delete
      </button>
    </NodeViewWrapper>
  );
};

export default MultipleOptionNodeView;
