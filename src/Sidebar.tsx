import { useState } from 'react';
import { schema } from './App';

function Sidebar({
  blocks,
  html,
}: {
  blocks: typeof schema.BlockNoteEditor.document;
  html: string;
}) {
  const [jsonCollapsed, setJsonCollapsed] = useState(false);
  const [htmlCollapsed, setHtmlCollapsed] = useState(false);

  return (
    <>
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
    </>
  );
}

export default Sidebar;
