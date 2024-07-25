import React from "react";
import CloseButton from "./CloseButton";
import SquareButton from "./SquareButton";

const Modal = React.forwardRef((props, ref) => {
    const {title, children, accept, onsubmit = () => {}} = props;

    return (
        <form ref={ref} onSubmit={onsubmit} className="hidden items-center w-full h-screen justify-center top-0 left-0 fixed z-30">
            <div className="w-full h-full bg-black opacity-10 absolute top-0 left-0"></div>
            <div className="fixed bottom-1/2 start-1/2 translate-y-1/2 -translate-x-1/2 overflow-x-hidden transition-all overflow-y-auto pointer-events-none">
                <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                    <div className="flex justify-between items-center py-3 px-4 border-b">
                        <h3 className="font-bold text-gray-800 ">
                        {title}
                        </h3>
                        <CloseButton onclick={() => {
                            ref.current.classList.replace('flex','hidden');
                        }}/>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <p className="mt-1 text-gray-800 dark:text-neutral-400">
                        {children}
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t">
                        <SquareButton type="button" onClick={onsubmit} colorCode="bg-primary">{accept}</SquareButton>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    );
});
export default Modal;