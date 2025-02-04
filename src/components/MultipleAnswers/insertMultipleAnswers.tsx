import { insertOrUpdateBlock } from '@blocknote/core';
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri';
import { schema } from '../../schema';

export const insertMultipleAnswers = (
  editor: typeof schema.BlockNoteEditor,
) => ({
  title: 'Multiple Answers',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'multipleAnswers',
      content: [
        {
          type: 'multipleOption',
          content: 'Option 1', // Plain string inline content
        },
        {
          type: 'multipleOption',
          content: 'Option 2', // Plain string inline content
        },
      ],
    });
  },
  aliases: ['multiple answers'],
  group: 'Question Type',
  icon: <RiCheckboxMultipleBlankFill />,
});
