import { insertOrUpdateBlock } from '@blocknote/core';
import { RiCheckboxMultipleLine } from 'react-icons/ri';
import { schema } from '../../schema';

export const insertMultipleChoice = (
  editor: typeof schema.BlockNoteEditor,
) => ({
  title: 'Multiple Choice',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'multipleChoice',
    });
  },
  aliases: ['multipleChoice'],
  group: 'Question Type',
  icon: <RiCheckboxMultipleLine />,
});
