import React from 'react';
import LongRoundedButton from '../Elements/LongRoundedButton';

const FormModal = React.forwardRef((props, ref) => {
    const {handler, children, btnText} = props;
    return (
        <form ref={ref} encType="multipart/form-data" onSubmit={handler} className="hidden items-center w-full h-screen justify-center top-0 left-0 fixed z-30">
            <div className="w-full h-full bg-black opacity-10 absolute top-0 left-0"></div>
            <div className="p-7 rounded-2xl w-[90%] lg:w-[40%] bg-white flex flex-col gap-5 z-10">
                {children}
                <LongRoundedButton>{btnText}</LongRoundedButton>
            </div>
        </form>
    )
});

export default FormModal;