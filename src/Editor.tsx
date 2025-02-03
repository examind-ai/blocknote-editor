import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './App.css';

import { filterSuggestionItems } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from '@blocknote/react';

function Editor({
  editor,
  onChange,
}: {
  editor: any;
  onChange: () => void;
}) {
  if (editor === undefined) return 'Loading content...';

  console.log(getDefaultReactSlashMenuItems(editor));

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
            [...getDefaultReactSlashMenuItems(editor)],
            query,
          )
        }
      />
    </BlockNoteView>
  );
}

export default Editor;
