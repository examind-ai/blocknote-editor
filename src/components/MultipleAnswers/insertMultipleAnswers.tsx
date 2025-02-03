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
      // Optionally you can provide initial content here.
    });
  },
  aliases: ['multiple answers'],
  group: 'Question Type',
  icon: <RiCheckboxMultipleBlankFill />,
});
