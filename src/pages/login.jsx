import FormLogin from "../components/Layout/FormLogin";
import Navbar from "../components/Layout/Navbar";
import { getScreenSize } from "../functions/layout";
import { getAnchorList } from "../functions/static";

const LoginPage = () => {
    return (
        <>
            {getScreenSize().width >= 640 && (<Navbar anchors={getAnchorList()} />)}
            <FormLogin/>
        </>
    );
};

export default LoginPage;