import logo from '../../assets/images/logo.png'

const Logo = (props) => {
    const {classname} = props;
    return (
        <img src={logo} alt="casiwa-logo" className={classname} />
    );
}
export default Logo;