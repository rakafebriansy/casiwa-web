import CloseButton from "./CloseButton";

const Modal = () => {
    return (
        <div id="hs-basic-modal" className="fixed top-0 start-0 z-[80] overflow-x-hidden transition-all overflow-y-auto pointer-events-none">
        <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold text-gray-800 ">
                Modal title
                </h3>
                <CloseButton/>
            </div>
            <div className="p-4 overflow-y-auto">
                <p className="mt-1 text-gray-800 dark:text-neutral-400">
                This is a wider card with supporting text below as a natural lead-in to additional content.
                </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  " data-hs-overlay="#hs-basic-modal">
                Close
                </button>
                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                Save changes
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Modal;