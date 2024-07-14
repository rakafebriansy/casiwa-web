import Logo from "../Elements/Logo";

const Signature = (props) => {
    const { isAuth = false } = props;
    if (isAuth) {
        return (
            <div className="flex justify-between max-w-[20rem] md:max-w-[24rem] gap-2 md:gap-3 items-center">
                <Logo classname="w-16 md:w-24"/>
                <h3 className="font-montserratBold text-2xl md:text-3xl text-primary">Casiwa</h3>
            </div>
        );
    }
    return (
        <div className="flex justify-between gap-3 max-w-[4rem] md:max-w-[10rem] items-center">
            <Logo classname="w-12 md:w-24"/>
            <h3 className="font-montserratBold text-base md:text-3xl text-primary">Casiwa</h3>
        </div>
    );
};

export default Signature;