import {
  filterSuggestionItems,
  insertOrUpdateBlock,
} from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from '@blocknote/react';
import { RiAlertFill } from 'react-icons/ri';
import { schema } from './App';

// Slash menu item to insert an Alert block
const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
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

// Function which gets all users for the mentions menu.
const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor,
): DefaultReactSuggestionItem[] => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map(user => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
    },
  }));
};

function Editor({
  editor,
  onChange,
}: {
  editor: typeof schema.BlockNoteEditor;
  onChange: () => void;
}) {
  if (editor === undefined) return 'Loading content...';

  return (
    <BlockNoteView
      slashMenu={false}
      editor={editor}
      theme="light"
      onChange={onChange}
    >
      {/* Replaces the default Slash Menu. */}
      <SuggestionMenuController
        triggerCharacter={'/'}
        getItems={async query =>
          // Gets all default slash menu items and `insertAlert` item.
          filterSuggestionItems(
            [
              ...getDefaultReactSlashMenuItems(editor),
              insertAlert(editor),
            ],
            query,
          )
        }
      />
      {/* Adds a mentions menu which opens with the "@" key */}
      <SuggestionMenuController
        triggerCharacter={'@'}
        getItems={async query =>
          // Gets the mentions menu items
          filterSuggestionItems(getMentionMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}

export default Editor;
