import { insertOrUpdateBlock } from '@blocknote/core';
import { RiAlertFill } from 'react-icons/ri';
import { schema } from '../../schema';

export const insertAlert = (
  editor: typeof schema.BlockNoteEditor,
) => ({
  title: 'Alert',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'alert',
    });
  },
  aliases: [
    'alert',
    'notification',
    'emphasize',
    'warning',
    'error',
    'info',
    'success',
  ],
  group: 'Other',
  icon: <RiAlertFill />,
});
