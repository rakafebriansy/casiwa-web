import Navbar from "../components/Layout/Navbar"

const anchorList = [
    {name: 'Beranda', path: '/beranda'},
    {name: 'Catatan', path: '/catatan'},
];

const LandingPage = () => {
    return (
        <Navbar anchors={anchorList}/>
    );
}

export default LandingPage;