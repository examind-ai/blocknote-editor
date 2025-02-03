import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './App.css';

import { PartialBlock } from '@blocknote/core';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import pretty from 'pretty';
import { useEffect, useState } from 'react';
import { setLocalState } from './localStorage';
import Sidebar from './Sidebar';

const LOCAL_STORAGE_EDITOR_STATE_KEY = 'stored-editor-state';

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.

function App() {
  const [blocks, setBlocks] = useState<PartialBlock[]>([]);
  const [html, setHTML] = useState<string>('');

  const editor = useCreateBlockNote();

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
          <BlockNoteView
            editor={editor}
            onChange={onChange}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
