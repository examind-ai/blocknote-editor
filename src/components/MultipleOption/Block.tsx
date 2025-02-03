import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import MultipleOption from './Node';

export default createBlockSpecFromStronglyTypedTiptapNode(
  MultipleOption,
  {}, // No extra props needed in this example
);
