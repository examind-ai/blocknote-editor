import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './App.css';

import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  PartialBlock,
} from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from '@blocknote/react';
import pretty from 'pretty';
import { useEffect, useMemo, useState } from 'react';
import { RiAlertFill } from 'react-icons/ri';
import { Alert } from './components/Alert';
import { Mention } from './components/Mention';
import { getLocalState, setLocalState } from './localStorage';

const LOCAL_STORAGE_EDITOR_STATE_KEY = 'stored-editor-state';

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
});

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

function App() {
  const [blocks, setBlocks] = useState<
    typeof schema.BlockNoteEditor.document
  >([]);
  const [html, setHTML] = useState<string>('');
  const [jsonCollapsed, setJsonCollapsed] = useState(false);
  const [htmlCollapsed, setHtmlCollapsed] = useState(false);

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  // Loads the previously stored editor contents.
  useEffect(() => {
    setInitialContent(
      getLocalState<PartialBlock[]>(LOCAL_STORAGE_EDITOR_STATE_KEY),
    );
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ schema, initialContent });
  }, [initialContent]);

  // @ts-expect-error Testing
  window.editor = editor;

  const onChange = async () => {
    if (editor === undefined) return;
    setLocalState(LOCAL_STORAGE_EDITOR_STATE_KEY, editor.document);
    setBlocks(editor.document);
    setHTML(pretty(await editor.blocksToHTMLLossy(editor.document)));
  };

  useEffect(() => {
    // on mount, trigger initial conversion of the initial content to blocks and html
    onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (editor === undefined) return 'Loading content...';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div
        style={{
          flex: '1 1 50%',
          borderRight: '1px solid #ddd',
          padding: '1rem',
        }}
      >
        <h3
          className={`section-header ${
            jsonCollapsed ? 'collapsed' : ''
          }`}
          onClick={() => setJsonCollapsed(!jsonCollapsed)}
        >
          Document JSON:
        </h3>
        <div
          className={`document-tree ${
            jsonCollapsed ? 'collapsed' : ''
          }`}
        >
          <pre>
            <code>{JSON.stringify(blocks, null, 2)}</code>
          </pre>
        </div>
        <h3
          className={`section-header ${
            htmlCollapsed ? 'collapsed' : ''
          }`}
          onClick={() => setHtmlCollapsed(!htmlCollapsed)}
        >
          Output HTML:
        </h3>
        <div
          className={`document-tree ${
            htmlCollapsed ? 'collapsed' : ''
          }`}
        >
          <pre>
            <code>{html}</code>
          </pre>
        </div>
      </div>
      <div style={{ flex: '1 1 50%', padding: '20px' }}>
        <div style={{ minHeight: '400px' }}>
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
                filterSuggestionItems(
                  getMentionMenuItems(editor),
                  query,
                )
              }
            />
          </BlockNoteView>
        </div>
      </div>
    </div>
  );
}

export default App;
