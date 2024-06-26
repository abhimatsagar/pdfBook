import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import FlipBook from './FlipBook.js';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs`;

const PDFLoader = ({ file, url }) => {
    const [pdf, setPdf] = useState(null);

    const loadePdfFromLocalFile = async () => {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const arrayBuffer = event.target.result;
            const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
            const loadedPdf = await loadingTask.promise;
            setPdf(loadedPdf);
        };
        reader.readAsArrayBuffer(file);
    }

    const loadePdfFromUrl = async () => {
        const pdfDoc = await pdfjs.getDocument(url).promise;
        setPdf(pdfDoc);
    }

    useEffect(() => {
        if (file)
            loadePdfFromLocalFile()
        else if (url)
            loadePdfFromUrl()
    }, [file, url]);

    return (
        <div style={{ width: "100%", height: "100%", display: 'flex', alignItems: "center", justifyContent: "center", overflow: 'hidden', padding: "20px 0px" }}>
            {pdf ? <FlipBook pdf={pdf} /> : <p>Loading PDF...</p>}
        </div>
    );
};

export default PDFLoader;
