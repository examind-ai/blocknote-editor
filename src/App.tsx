import { Block } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useState } from 'react';

function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [html, setHTML] = useState<string>('');
  const [jsonCollapsed, setJsonCollapsed] = useState(false);
  const [htmlCollapsed, setHtmlCollapsed] = useState(false);

  const editor = useCreateBlockNote();

  // @ts-expect-error Testing
  window.editor = editor;

  const onChange = async () => {
    setBlocks(editor.document);
    setHTML(await editor.blocksToHTMLLossy(editor.document));
  };

  useEffect(() => {
    // on mount, trigger initial conversion of the initial content to blocks and html
    onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            editor={editor}
            theme="light"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
