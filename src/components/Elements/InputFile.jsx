import { useState } from "react";
import { UploadFileIcon } from "../../functions/svgs";
import { useRef } from "react";

const InputFile = (props) => {
    const {name, message, dropzone = false} = props;
    const [files, setFiles] = useState(null);
    const inputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
    };

    if(dropzone) {
        return (
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex items-center justify-center w-full input-file">
                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-40 border-2 ${files && files.length > 0 ? 'border-primary' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer text-gray-500 hover:text-primary hover:border-primary ${files && files.length > 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-100`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadFileIcon strokeColor={files && files.length > 0 ? 'stroke-primary' : 'stroke-[#9B9B9B]'} />
                        {(!files || files.length == 0) && (
                            <>
                            <p className="mb-2 text-sm "><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
                            <p className="text-xs ">PDF (MAX. 20MB)</p>
                            </>
                        )}
                        {files && files.length > 0 && (
                            <>
                            <p className="mb-2 text-sm text-primary">{files[0].name}</p>
                            </>
                        )}
                    </div>
                    <input name={name} id="dropzone-file" type="file" className="hidden" onChange={e => {setFiles(e.target.files);}} ref={inputRef}/>
                </label>
            </div> 
        );
    }
    return (
        <div className="">
            <input type="file" name={name} className="block select-none cursor-pointer w-full border-2 shadow-sm rounded-lg text-sm focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none 
            file:bg-[#F9F9F9] file:border-0
            file:me-4
            file:py-3 file:px-4"></input>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300" id="file_input_help">{message}</p>
        </div>
    )
};

export default InputFile;