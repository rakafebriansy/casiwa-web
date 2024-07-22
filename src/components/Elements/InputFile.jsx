import { useState } from "react";
import { UploadFileIcon } from "../../functions/svgs";
import { useRef } from "react";

const InputFile = (props) => {
    const {name} = props;
    const [files, setFiles] = useState(null);
    const inputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
    };


    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex items-center justify-center w-full input-file">
            <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 border-2 ${files && files.length > 0 ? 'border-primary' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer hover:border-primary ${files && files.length > 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-100`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadFileIcon strokeColor={files && files.length > 0 ? 'stroke-primary' : 'stroke-[#9B9B9B]'} />
                    {(!files || files.length == 0) && (
                        <>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </>
                    )}
                    {files && files.length > 0 && (
                        <>
                        <p className="mb-2 text-sm text-primary dark:text-gray-400">{files[0].name}</p>
                        </>
                    )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={e => {setFiles(e.target.files)}} ref={inputRef}/>
            </label>
        </div> 
    );
};

export default InputFile;