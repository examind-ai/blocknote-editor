import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './App.css';

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
import {
  RiAlertFill,
  RiCheckboxMultipleFill,
  RiCheckboxMultipleLine,
} from 'react-icons/ri';
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

// Slash menu item to insert a MultipleChoice block
const insertMultipleChoice = (
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

const insertMultipleAnswer = (
  editor: typeof schema.BlockNoteEditor,
) => ({
  title: 'Multiple Answer',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'multipleAnswer',
      props: {
        // Initialize with a default option
        options: JSON.stringify([
          {
            id: crypto.randomUUID(),
            text: 'Option 1',
            correct: false,
          },
        ]),
      },
    });
  },
  aliases: ['multipleAnswer'],
  group: 'Question Type',
  icon: <RiCheckboxMultipleFill />,
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
          filterSuggestionItems(
            [
              ...getDefaultReactSlashMenuItems(editor),
              insertAlert(editor),
              insertMultipleChoice(editor),
              insertMultipleAnswer(editor),
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
