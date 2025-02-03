// MultipleAnswersBlock.ts
import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import MultipleOptionNode from '../MultipleOption/Node';
import MultipleAnswersNode from './Node';

// In this simple example we don’t need extra props, so we pass an empty prop schema.
const MultipleAnswersBlock =
  createBlockSpecFromStronglyTypedTiptapNode(
    MultipleAnswersNode,
    {}, // (or you can define a propSchema if needed)
    [
      // Register additional TipTap nodes used by the block.
      MultipleOptionNode,
    ],
  );

export default MultipleAnswersBlock;
