import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
} from '@blocknote/core';
import { withMultiColumn } from '@blocknote/xl-multi-column';
import { Alert } from '../components/Alert';
import { Mention } from '../components/Mention';
import { withMultipleAnswers } from '../components/MultipleAnswers/schema';
import { MultipleChoice } from '../components/MultipleChoice';

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = withMultipleAnswers(
  withMultiColumn(
    BlockNoteSchema.create({
      blockSpecs: {
        ...defaultBlockSpecs,
        alert: Alert,
        multipleChoice: MultipleChoice,
      },
      inlineContentSpecs: {
        ...defaultInlineContentSpecs,
        mention: Mention,
      },
    }),
  ),
);
