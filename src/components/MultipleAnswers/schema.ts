import {
  BlockNoteSchema,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { MultipleAnswersBlock, OptionBlock } from './index';

// Schema for the MultipleAnswers feature
export const multipleAnswersSchema = BlockNoteSchema.create({
  blockSpecs: {
    multipleAnswers: MultipleAnswersBlock,
    option: OptionBlock,
  },
});

// Helper function to add MultipleAnswers support to an existing schema
export const withMultipleAnswers = <
  B extends BlockSchema,
  I extends InlineContentSchema,
  S extends StyleSchema,
>(
  schema: BlockNoteSchema<B, I, S>,
) => {
  const newSchema = BlockNoteSchema.create({
    blockSpecs: {
      ...schema.blockSpecs,
      multipleAnswers: MultipleAnswersBlock,
      option: OptionBlock,
    },
    inlineContentSpecs: schema.inlineContentSpecs,
    styleSpecs: schema.styleSpecs,
  });

  return newSchema as unknown as BlockNoteSchema<
    B & {
      multipleAnswers: typeof MultipleAnswersBlock;
      option: typeof OptionBlock;
    },
    I,
    S
  >;
};
