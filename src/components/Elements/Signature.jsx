import Logo from "./Logo";

const Signature = () => {
    return (
        <div className="flex justify-between gap-3 max-w-[22rem] items-center">
            <Logo classname="w-12 md:w-24"/>
            <h3 className="font-montserratBold text-base md:text-3xl text-primary">Casiwa</h3>
        </div>
    );
};

export default Signature;