import axios from "axios";
import Navbar from "../components/Layout/Navbar"
import { getAnchorList } from "../functions/static";

const DashboardPage = () => {
    return (
        <>
        <Navbar anchors={getAnchorList(true)} isLogin = {true}/>
        <h1 className="mt-44 text-center text-3xl">DASHBOARD</h1>
        </>
    );
}

export default DashboardPage;