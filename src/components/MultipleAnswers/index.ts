import { createBlockSpecFromStronglyTypedTiptapNode } from '@blocknote/core';
import { MultipleAnswersReactComponent } from './MultipleAnswersBlock';
import { OptionReactComponent } from './OptionBlock';
import { MultipleAnswers, Option } from './pm-nodes';

// Create block specs from our Prosemirror nodes
export const MultipleAnswersBlock = {
  ...createBlockSpecFromStronglyTypedTiptapNode(MultipleAnswers, {
    question: {
      default: '',
    },
    textAlignment: {
      default: 'left',
    },
    textColor: {
      default: 'default',
    },
    backgroundColor: {
      default: 'default',
    },
  }),
  ReactComponent: MultipleAnswersReactComponent,
};

export const OptionBlock = {
  ...createBlockSpecFromStronglyTypedTiptapNode(Option, {
    isCorrect: {
      default: false,
    },
    textAlignment: {
      default: 'left',
    },
    textColor: {
      default: 'default',
    },
    backgroundColor: {
      default: 'default',
    },
  }),
  ReactComponent: OptionReactComponent,
};

// Re-export everything
export * from './pm-nodes';
