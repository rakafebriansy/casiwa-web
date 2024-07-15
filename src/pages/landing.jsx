import Navbar from "../components/Layout/Navbar"
import { getAnchorList } from "../functions/static";

const LandingPage = () => {
    return (
        <>
        <Navbar anchors={getAnchorList()}/>
        <h1 className="mt-44 text-center text-3xl">LANDING</h1>
        </>
    );
}

export default LandingPage;