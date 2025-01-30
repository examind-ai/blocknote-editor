function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div
        style={{
          flex: '1 1 20%',
          borderRight: '1px solid #ddd',
          padding: '1rem',
        }}
      ></div>
      <div style={{ flex: '1 1 80%', padding: '20px' }}></div>
    </div>
  );
}

export default App;
