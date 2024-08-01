import { Link } from "react-router-dom";
import profileDefault from "../../assets/images/profile-default.png"
import { useRef } from "react";

const ProfilePicture = (props) => {
    const { isAdmin, profilePicture, classname } = props;
    const refDropdown = useRef(null);
    
    const dropdownToggle = () => {
        if(refDropdown.current.classList.contains('hidden')) {
            refDropdown.current.classList.replace('hidden','flex');
        } else if(refDropdown.current.classList.contains('flex')) {
            refDropdown.current.classList.replace('flex','hidden');
        }    
    }

    return (
        <div className="relative w-fit">
            <button type="button" onClick={dropdownToggle} className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border cursor-pointer ${classname}`}>
                <img src={ profilePicture ?? profileDefault } alt="profile-picture" />
            </button>
            <ul ref={refDropdown} className={`w-fit hidden -left-1/2 p-2 absolute flex-col -bottom-[250%] bg-white small-shadow border-[#9B9B9B] cursor-pointer rounded-lg justify-between items-center`} type="text">
                <li className="flex z-10 justify-start w-full bg-white hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                    <Link to={isAdmin ? '/admin/profile' : '/profile'} className="text-xs w-full h-full lg:text-sm select-none">Profil</Link>
                </li>
                <li className="flex z-10 justify-start w-full bg-white hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                    <Link to={isAdmin ? '/admin/redeem' : '/redeem'} className="text-xs w-full h-full lg:text-sm select-none">Redeem</Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfilePicture;