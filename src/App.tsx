import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

function App() {
  const editor = useCreateBlockNote();
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div
        style={{
          flex: '1 1 20%',
          borderRight: '1px solid #ddd',
          padding: '1rem',
        }}
      ></div>
      <div style={{ flex: '1 1 80%', padding: '20px' }}>
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
}

export default App;
