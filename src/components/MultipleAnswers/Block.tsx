import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import MultipleOption from '../MultipleOption/Node';
import MultipleAnswers from './Node';

const Block = createBlockSpecFromStronglyTypedTiptapNode(
  MultipleAnswers,
  {}, // No extra props for now
  [MultipleOption], // Register the child node so BlockNote knows about it
);

export default Block;
