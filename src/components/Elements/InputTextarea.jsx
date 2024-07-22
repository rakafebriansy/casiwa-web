const InputTextarea = () => {
    return (
        <div className="max-w-sm">
            <div className="flex justify-between items-center">
                <label htmlFor="hs-textarea-with-corner-hint" className="block text-sm font-medium mb-2 dark:text-white">Contact us</label>
                <span className="block mb-2 text-sm text-gray-500 dark:text-neutral-500">100 characters</span>
            </div>
            <textarea id="hs-textarea-with-corner-hint" className="py-3 outline-primary px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Say hi..."></textarea>
        </div>
    );
};

export default InputTextarea;