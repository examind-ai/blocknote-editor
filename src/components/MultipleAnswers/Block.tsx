import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import MultipleAnswers from './Node';
import MultipleOption from '../MultipleOption/Node';

export default createBlockSpecFromStronglyTypedTiptapNode(
  MultipleAnswers,
  {}, // No extra props for now
  [MultipleOption], // Register the child node so BlockNote knows about it
);
