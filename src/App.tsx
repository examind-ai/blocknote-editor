import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './App.css';

import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  PartialBlock,
} from '@blocknote/core';
import pretty from 'pretty';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from './components/Alert';
import { Mention } from './components/Mention';
import { MultipleChoice } from './components/MultipleChoice';
import Editor from './Editor';
import { getLocalState, setLocalState } from './localStorage';
import Sidebar from './Sidebar';

const LOCAL_STORAGE_EDITOR_STATE_KEY = 'stored-editor-state';

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    multipleChoice: MultipleChoice,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
});

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
