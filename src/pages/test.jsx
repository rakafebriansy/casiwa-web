import { useEffect, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { LoadingIcon } from '../functions/svgs';
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';


const TestPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulasi loading data
        setTimeout(() => {
          setLoading(false);
        }, 3000); // Ganti 3000 dengan durasi yang sesuai
      }, []);
    return (
        <>
        <main className="flex justify-center items-center min-h-screen relative">
            <div className="bg-blue">
            <div className="flex justify-center items-center h-screen bg-white bg-opacity-50">
                {loading ? (
                    // <div className="border-4 border-t-4 border-blue-500 border-opacity-20 border-t-blue-500 rounded-full w-16 h-16 "></div>
                    <LoadingIcon classname="animate-spin"/>
                ) : (
                    <div className="">Done</div>
                )}
                </div>
            </div>
        </main>
        </>
    );
};

export default TestPage;