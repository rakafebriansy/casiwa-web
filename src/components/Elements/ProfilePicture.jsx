import { Link } from "react-router-dom";
import profileDefault from "../../assets/images/profile-default.png"

const ProfilePicture = (props) => {
    const { profilePicture, classname, path } = props;
    return (
        <Link to={path} className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border cursor-pointer ${classname}`}>
            <img src={ profilePicture ?? profileDefault } alt="profile-picture" />
        </Link>
    );
};

export default ProfilePicture;