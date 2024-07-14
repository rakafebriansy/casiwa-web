import Navbar from "../components/Layout/Navbar"
import { getAnchorList } from "../functions/static";

const LandingPage = () => {
    return (
        <Navbar anchors={getAnchorList()}/>
    );
}

export default LandingPage;