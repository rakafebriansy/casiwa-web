import profileDefault from "../../assets/images/profile-default.png"

const ProfilePicture = (props) => {
    const { profilePicture } = props;
    return (
        <div className="w-10 h-10 rounded-full border cursor-pointer">
            <img src={ profilePicture ?? profileDefault } alt="profile-picture" />
        </div>
    );
};

export default ProfilePicture;