import './App.css';
import { useState } from 'react';
import PDFLoader from './PDFLoader';

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('')

  const handleFileChange = (e) => {
    if (e.target.type === 'file' && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl('');
    } else if (e.target.type === 'text') {
      setUrl(e.target.value);
      setFile(null);
    }
  };

  return (
    <div className="App">
      <h1>PDF Flipbook</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input type="text" placeholder="Enter PDF URL" onChange={handleFileChange} />
      {(file || url) && <PDFLoader file={file} url={url} />}
    </div>
  );
}

export default App;
