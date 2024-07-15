import Alert from "../components/Elements/Alert";
import Navbar from "../components/Layout/Navbar"
import { getAnchorList } from "../functions/static";
import { getUniversities } from "../services/list.userDetail.mjs";

const LandingPage = () => {
    return (
        <>
        <Navbar anchors={getAnchorList()}/>
        <h1 className="mt-44 text-center text-3xl">LANDING</h1>
        <Alert color="blue">Hello</Alert>
        </>
    );
}

export default LandingPage;