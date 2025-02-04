// MultipleOptionBlock.ts
import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import MultipleOptionNode from './Node';

const MultipleOptionBlock =
  createBlockSpecFromStronglyTypedTiptapNode(
    MultipleOptionNode,
    {}, // You can pass a prop schema here if needed
  );

export default MultipleOptionBlock;
