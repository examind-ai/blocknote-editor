import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
} from '@blocknote/core';
import { Alert } from '../components/Alert';
import { Mention } from '../components/Mention';
import { MultipleAnswersBlock } from '../components/MultipleAnswers';
import { MultipleChoice } from '../components/MultipleChoice';
// Optionally, if you want to allow multipleOption as a top‑level block too, you can register it:
import MultipleOptionBlock from '../components/MultipleOption/Block';

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    multipleChoice: MultipleChoice,
    multipleAnswers: MultipleAnswersBlock,
    // You might or might not register multipleOption as a top-level block.
    multipleOption: MultipleOptionBlock,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
});
