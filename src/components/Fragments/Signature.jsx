import Logo from "../Elements/Logo";

const Signature = (props) => {
    const { isAuth, isFooter, classname} = props;
    if (isAuth) {
        return (
            <div className={`flex max-w-[20rem] md:max-w-[24rem] gap-2 md:gap-3 items-center ${classname}`}>
                <Logo classname="w-16 md:w-24"/>
                <h3 className="font-montserratBold text-2xl md:text-3xl text-primary">Casiwa</h3>
            </div>
        );
    }
    if (isFooter) {
        return (
            <div className={`flex max-w-40 md:max-w-[24rem] gap-2 md:gap-3 items-center ${classname}`}>
                <Logo classname="w-16 md:w-24"/>
                <h3 className="font-montserratBold text-2xl md:text-3xl text-primary">Casiwa</h3>
            </div>
        );
    }
    return (
        <div className={`flex gap-1 max-w-[8rem] lg:max-w-[14rem] items-center ${classname}`}>
            <Logo classname="w-12 md:w-24"/>
            <h3 className="font-montserratBold text-base md:text-3xl text-primary">Casiwa</h3>
        </div>
    );
};

export default Signature;