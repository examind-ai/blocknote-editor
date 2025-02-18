import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './App.css';

import {
  BlockNoteEditor,
  PartialBlock,
  locales,
} from '@blocknote/core';
import {
  multiColumnDropCursor,
  locales as multiColumnLocales,
} from '@blocknote/xl-multi-column';
import pretty from 'pretty';
import { useEffect, useMemo, useState } from 'react';
import Editor from './Editor';
import { getLocalState, setLocalState } from './localStorage';
import { schema } from './schema';
import Sidebar from './Sidebar';

const LOCAL_STORAGE_EDITOR_STATE_KEY = 'stored-editor-state';

function App() {
  const [blocks, setBlocks] = useState<
    (typeof schema.PartialBlock)[]
  >([]);
  const [html, setHTML] = useState<string>('');

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
    return BlockNoteEditor.create({
      schema,
      // The default drop cursor only shows up above and below blocks - we replace
      // it with the multi-column one that also shows up on the sides of blocks.
      dropCursor: multiColumnDropCursor,
      // Merges the default dictionary with the multi-column dictionary.
      dictionary: {
        ...locales.en,
        multi_column: multiColumnLocales.en,
      },
      initialContent,
    });
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
        <Sidebar blocks={blocks} html={html} />
      </div>
      <div
        style={{ flex: '1 1 50%', padding: '20px', maxWidth: '50%' }}
      >
        <div style={{ minHeight: '400px' }}>
          <Editor editor={editor} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
