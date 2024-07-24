import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { useEffect, useRef, useState } from "react";
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';

const TestPage = () => {
    const url = '/assets/CVRaka.pdf';
    const [rendered, setRendered] = useState(false);
    const refImg = useRef(null);

    async function pdfToImage(pdfUrl) {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); 
    
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
    
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;
    
        const img = new Image();
        const dataURL = canvas.toDataURL('image/jpeg');
        img.src = dataURL;
    
        setRendered(true);
        refImg.current.src = img.src;

        // console.log(dataURL)
        // const link = document.createElement('a');
        // link.href = dataURL;
        // link.download = 'image.jpg'; // Nama file unduhan
        // link.click();
    }
    
    useEffect(() => {
        if(!rendered) {
            pdfToImage(url);
        }
    },[]);

    return (
        <div className="w-full flex items-center justify-center">
            <img ref={refImg} alt="" />
        </div>
    );
};

export default TestPage;