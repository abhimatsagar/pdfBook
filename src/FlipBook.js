// src/components/FlipBook.js
import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

const FlipBook = ({ pdf }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const loadPages = async () => {
            const numPages = pdf.numPages;
            const loadedPages = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;
                loadedPages.push(canvas.toDataURL());
            }

            setPages(loadedPages);
        };

        loadPages();
    }, [pdf]);

    return (
        <HTMLFlipBook width={600} height={800} turnShadow={'close'}>
            {pages.map((page, index) => (
                <div className="page" key={index}>
                    <img src={page} alt={`Page ${index + 1}`} style={{ width: '100%', height: '100%' }} />
                </div>
            ))}
        </HTMLFlipBook>
    );
};

export default FlipBook;
