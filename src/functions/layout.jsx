export const getScreenSize = () =>  {
    return {
        height: window.screen.height,
        width: window.screen.width
    };
}

export const setAlert = (value) => {
    const {status = false, ref, message} = value;
    if(status && ref.current) {
        ref.current.classList.replace('hidden','flex');
        ref.current.firstElementChild.innerText = message;
    } else {
        ref.current.classList.replace('flex','hidden');
    }
}