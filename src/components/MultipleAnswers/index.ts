import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import { MultipleAnswers, Option } from './pm-nodes';

// Create block specs from our Prosemirror nodes
export const MultipleAnswersBlock =
  createBlockSpecFromStronglyTypedTiptapNode(MultipleAnswers, {
    question: {
      default: '',
    },
  });

export const OptionBlock = createBlockSpecFromStronglyTypedTiptapNode(
  Option,
  {
    isCorrect: {
      default: false,
    },
  },
);

// Re-export everything
export * from './pm-nodes';
