import { useContext } from "react";
import Navbar from "../components/Layout/Navbar";
import { AuthorizedContext } from "../contexts/Authorized";
import { getAnchorList } from "../functions/static";
import Modal from "../components/Elements/Modal";

const NoteDetailsPage = () => {
    const {isAuthorized} = useContext(AuthorizedContext);
    
    return (
        <>
        <Navbar anchors={getAnchorList(isAuthorized.success)} isLogin={isAuthorized.success} />
        <div className="mt-52">
            <Modal/>
        </div>
        </>
    );
};

export default NoteDetailsPage;