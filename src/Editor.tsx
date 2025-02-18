import {
  combineByGroup,
  filterSuggestionItems,
} from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from '@blocknote/react';
import { getMultiColumnSlashMenuItems } from '@blocknote/xl-multi-column';
import { insertAlert } from './components/Alert/insertAlert';
import { getMentionMenuItems } from './components/Mention/getMentionMenuItem';
import { insertMultipleChoice } from './components/MultipleChoice/insertMultipleChoice';
import { schema } from './schema';

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
              ...combineByGroup(
                getDefaultReactSlashMenuItems(editor),
                getMultiColumnSlashMenuItems(editor),
              ),
              insertAlert(editor),
              insertMultipleChoice(editor),
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
