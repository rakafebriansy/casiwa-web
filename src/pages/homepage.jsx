import SearchButton from "../components/Elements/SearchButton";
import Navbar from "../components/Layout/Navbar"
import SquareButton from "../components/Elements/SquareButton";
import studyImage from "../assets/images/study.png"
import globeImage from '../assets/images/globe.png'
import schoolImage from "../assets/images/school.png"
import partnershipImage from "../assets/images/partnership.png"
import landingBackgroundImage from "../assets/images/landing-background.png"
import Footer from "../components/Layout/Footer";
import { useContext, useEffect, useState } from "react";
import { authenticatedUser } from "../../services/auth.authenticatedUser.jsx";
import { AnchorListContext } from "../contexts/AnchorList";
import { getCookie } from "../functions/main";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from '../functions/svgs';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        const keyword = e.target.keyword;
        navigate('/notes?keyword=' + keyword.value);
    }

    useEffect(()=> {
        const userData = getCookie('user');
        if(userData) {
            authenticatedUser(userData.token,
                res => {
                setIsLogin(res.data.success);
            }, 
            err => {
                console.log('Unauthenticated')
            }, 
            () => {
                setIsLoading(false);
            });
        }
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
        <main>
        <Navbar anchors={isLogin ? anchorList[0] : []} isThisPage="Beranda" isLogin={isLogin}/>
        <section className="bg-gradient-to-tr pt-20 from-[#dfe9f3] via-60% via-white to-white w-full flex justify-center items-center min-h-screen">
            <img src={landingBackgroundImage} alt="" className="hidden absolute h-screen w-screen lg:block"/>
            <form onSubmit={handleSearch} className="w-[80%] gap-[5rem] flex flex-col justify-between z-[10]">
                <div className="font-montserratBold w-full flex flex-col md:flex-row justify-around items-center gap-10">
                    <div className="text-base lg:text-2xl">
                        <p className="text-[#596280]">CASIWA</p>
                        <div className="text-3xl lg:text-4xl">
                            <p>SOLUSI <span className="text-secondary">BELAJAR</span></p>
                            <p><span className="text-secondary">SAMBIL</span> BEKERJA</p>
                        </div>
                        <p className="text-[#00293F] font-montserratRegular text-sm lg:text-base">Layanan Berbagi Catatan Mahasiswa</p>
                    </div>
                    <div className="w-full lg:w-[40%]">
                        <img src={globeImage} className="w-full" alt="" />
                    </div>
                </div>
                <SearchButton name="keyword">Cari dokumen</SearchButton>
            </form>
        </section>
        <section className="py-6 flex flex-col items-center">
            <h1 className="text-2xl font-montserratBold text-[#4A4A4A] text-center mb-6">Kenapa Harus CASIWA ?</h1>
            <ul className="flex lg:h-96 flex-col lg:flex-row lg:w-[80%] items-center justify-start gap-6">
                <li className="w-[60%] h-full hover:shadow-xl dotted-card text-[#4A4A4A] hover:bg-secondary rounded-[2.5rem] box-border transition hover:border-secondary hover:border-dashed py-5 px-10 flex flex-col gap-3 justify-start  items-center text-[0.7rem] lg:text-sm">
                    <div className="w-[20%]">
                        <svg width="90" height="89" className="w-full" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_392_2180)">
                            <path d="M60.6545 6.52356C59.5968 5.44324 58.3094 4.61509 56.8877 4.10062C55.4661 3.58615 53.9468 3.39858 52.4427 3.55185C50.9387 3.70513 49.4885 4.1953 48.1998 4.98595C46.9112 5.77661 45.8172 6.84744 44.9992 8.1189C44.1813 6.84744 43.0873 5.77661 41.7987 4.98595C40.51 4.1953 39.0598 3.70513 37.5558 3.55185C36.0517 3.39858 34.5324 3.58615 33.1108 4.10062C31.6891 4.61509 30.4017 5.44324 29.344 6.52356C27.4329 8.47433 26.3624 11.0965 26.3624 13.8275C26.3624 16.5584 27.4329 19.1806 29.344 21.1314L44.9992 37.0438L60.6545 21.1314C62.5656 19.1806 63.6361 16.5584 63.6361 13.8275C63.6361 11.0965 62.5656 8.47433 60.6545 6.52356Z" stroke="#7A8FC8" strokeWidth="7" strokeMiterlimit="10" strokeLinecap="square"/>
                            <path d="M18.9076 85.5012V78.0464L5.63054 61.4518C4.57452 60.1313 3.99882 58.4909 3.99792 56.8V35.1809C3.99792 33.698 4.58699 32.2759 5.63553 31.2274C6.68408 30.1788 8.10622 29.5898 9.58908 29.5898C11.0719 29.5898 12.4941 30.1788 13.5426 31.2274C14.5912 32.2759 15.1802 33.698 15.1802 35.1809V46.6838" stroke="#7A8FC8" strokeWidth="7" strokeMiterlimit="10" strokeLinecap="square"/>
                            <path d="M37.5451 85.4997V66.2214C37.5447 64.2444 36.759 62.3485 35.3609 60.9508L22.6354 48.2253C21.6465 47.2375 20.3058 46.6826 18.908 46.6826C17.5102 46.6826 16.1695 47.2375 15.1806 48.2253C14.1927 49.2143 13.6378 50.555 13.6378 51.9528C13.6378 53.3506 14.1927 54.6913 15.1806 55.6802L26.3629 66.8625" stroke="#7A8FC8" strokeWidth="7" strokeMiterlimit="10" strokeLinecap="square"/>
                            <path d="M71.0917 85.5012V78.0464L84.3688 61.4518C85.4248 60.1313 86.0005 58.4909 86.0014 56.8V35.1809C86.0014 33.698 85.4123 32.2759 84.3638 31.2274C83.3152 30.1788 81.8931 29.5898 80.4103 29.5898C78.9274 29.5898 77.5053 30.1788 76.4567 31.2274C75.4082 32.2759 74.8191 33.698 74.8191 35.1809V46.6838" stroke="#7A8FC8" strokeWidth="7" strokeMiterlimit="10" strokeLinecap="square"/>
                            <path d="M52.4546 85.4997V66.2214C52.455 64.2444 53.2407 62.3485 54.6389 60.9508L67.3643 48.2253C68.3533 47.2375 69.6939 46.6826 71.0917 46.6826C72.4896 46.6826 73.8302 47.2375 74.8192 48.2253C75.807 49.2143 76.3619 50.555 76.3619 51.9528C76.3619 53.3506 75.807 54.6913 74.8192 55.6802L63.6369 66.8625" stroke="#7A8FC8" strokeWidth="7" strokeMiterlimit="10" strokeLinecap="square"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_392_2180">
                            <rect width="90" height="89" fill="noe"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <p className="font-montserratSemiBold text-center lg:text-base">CASIWA menghargai keberagaman latar belakang, budaya, dan identitas gender.</p>
                    <p className="font-montserratLight">Kami bertanggung jawab atas dampak lingkungan dan peran kami dalam masyarakat. Kami terus berupaya menjadi lebih beragam, inklusif, dan ramah lingkungan.</p>
                </li>
                <li className="w-[60%] h-full hover:shadow-xl dotted-card text-[#4A4A4A] hover:bg-secondary rounded-[2.5rem] box-border transition hover:border-secondary hover:border-dashed py-5 px-10 flex flex-col gap-3 justify-start  items-center text-[0.7rem] lg:text-sm">
                    <div className="w-[20%]">
                        <svg width="30" className='w-full' height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_367_2382)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.498047 0H3.99805H14.8979H18.3979H61.5979H65.0979H75.9981H79.4981V3.5V21.5C79.4981 25.2926 77.9915 28.9299 75.3098 31.6116C72.628 34.2934 68.9907 35.8 65.1981 35.8H64.8528C64.0976 41.1635 61.6207 46.174 57.7463 50.0484C53.872 53.9227 48.8616 56.3996 43.498 57.1549V64.8H47.198C51.9453 64.8 56.4983 66.6859 59.8552 70.0428C63.2121 73.3997 65.0979 77.9527 65.0979 82.7001V86.2001H61.5979H18.3979H14.8979V82.7001C14.8979 77.9527 16.7838 73.3997 20.1407 70.0428C23.4976 66.6859 28.0506 64.8 32.798 64.8H36.498V57.1549C31.1345 56.3997 26.1239 53.9227 22.2496 50.0484C18.3752 46.174 15.8983 41.1635 15.1431 35.8H14.798C11.0055 35.8 7.36819 34.2934 4.68642 31.6116C2.00465 28.9299 0.498047 25.2926 0.498047 21.5V3.5V0ZM7.49805 7H14.8979V28.8H14.798C12.862 28.8 11.0052 28.0309 9.63617 26.6619C8.26715 25.2929 7.49805 23.4361 7.49805 21.5V7ZM65.0979 28.8V7H72.4981V21.5C72.4981 23.4361 71.729 25.2929 70.36 26.6619C68.991 28.0309 67.1342 28.8 65.1981 28.8H65.0979ZM21.8979 7V32.3C21.8979 37.1004 23.8049 41.7042 27.1993 45.0986C30.5937 48.493 35.1975 50.4 39.9979 50.4C44.7984 50.4 49.4022 48.493 52.7966 45.0986C56.191 41.7042 58.0979 37.1004 58.0979 32.3V7H21.8979ZM25.0905 74.9926C27.1346 72.9484 29.9071 71.8 32.798 71.8H47.198C50.0888 71.8 52.8613 72.9484 54.9054 74.9926C56.0998 76.187 56.9884 77.63 57.5207 79.2001H22.4752C23.0075 77.63 23.8961 76.187 25.0905 74.9926Z" fill="#7A8FC8"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_367_2382">
                        <rect width="80" height="87" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <p className="font-montserratSemiBold text-center lg:text-base">Tujuan kami adalah memberikan dampak positif dan nyata kepada pengguna kami.</p>
                    <p className="font-montserratLight">Kami berkomitmen untuk menciptakan sistem belajar yang mudah dan bermanfaat, dan terus menantang diri kami untuk membuat perbedaan.</p>
                </li>
                <li className="w-[60%] h-full hover:shadow-xl dotted-card text-[#4A4A4A] hover:bg-secondary rounded-[2.5rem] box-border transition hover:border-secondary hover:border-dashed py-5 px-10 flex flex-col gap-3 justify-start  items-center text-[0.7rem] lg:text-sm">
                    <div className="w-[20%]">
                        <svg width="88" height="87" className="w-full" viewBox="0 0 88 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_392_2177)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M33.089 0C27.7454 0 23.0494 2.84821 20.6041 7.32714C9.2458 8.11519 0.498047 17.3701 0.498047 28.9545C0.498047 33.2749 1.77853 37.6368 4.2097 41.2357C1.9796 43.6773 0.498047 46.9701 0.498047 50.7727C0.498047 54.6143 2.03699 58.2035 4.67784 60.7543C4.31126 62.3116 4.13441 63.9004 4.13441 65.3182C4.13441 77.433 13.7014 87 25.8162 87C33.4974 87 40.1543 83.1541 43.998 77.2514C47.8418 83.1541 54.4987 87 62.1799 87C74.2947 87 83.8617 77.433 83.8617 65.3182C83.8617 63.6786 83.687 62.1791 83.3363 60.7369C85.9661 58.1872 87.498 54.6056 87.498 50.7727C87.498 46.9701 86.0165 43.6773 83.7864 41.2357C86.2176 37.6368 87.498 33.2749 87.498 28.9545C87.498 17.3701 78.7503 8.11519 67.392 7.32714C64.9467 2.84821 60.2507 0 54.9071 0C50.4914 0 46.6148 1.86376 43.9981 4.87044C41.3813 1.86376 37.5047 0 33.089 0ZM40.498 65.3182V61.8182V36.2273V32.7273H47.498V36.2273V61.8182V65.3182C47.498 73.567 53.931 80 62.1799 80C70.4287 80 76.8617 73.567 76.8617 65.3182C76.8617 63.5719 76.5794 62.1957 76.0211 60.7999L74.9343 58.0829L77.4158 56.532C79.2712 55.3724 80.498 53.2386 80.498 50.7727C80.498 49.0394 79.8858 47.4969 78.9046 46.2859C76.0667 48.3795 72.6458 49.8611 68.9499 50.4059C67.8584 55.1783 64.4057 59.0538 59.6503 60.6389L56.3299 61.7457L54.1163 55.1049L57.4367 53.9981C60.361 53.0234 62.3162 50.3682 62.3162 47.1367C62.3162 44.8955 61.3175 42.9741 59.9392 41.8255L57.2504 39.5848L61.7317 34.2073L64.4205 36.4479C66.4912 38.1736 68.0448 40.5771 68.8023 43.3244C71.7529 42.7059 74.4304 41.2088 76.4324 39.2068L76.438 39.2012C78.9955 36.6402 80.498 32.832 80.498 28.9545C80.498 20.7057 74.065 14.2727 65.8162 14.2727H65.8141H65.812H65.8099H65.8078H65.8057H65.8036H65.8015H65.7994H65.7974H65.7953H65.7933H65.7913H65.7892H65.7872H65.7852H65.7832H65.7812H65.7792H65.7772H65.7752H65.7733H65.7713H65.7694H65.7674H65.7655H65.7635H65.7616H65.7597H65.7578H65.7559H65.754H65.7521H65.7503H65.7484H65.7465H65.7447H65.7428H65.741H65.7391H65.7373H65.7355H65.7337H65.7319H65.7301H65.7283H65.7265H65.7247H65.7229H65.7212H65.7194H65.7177H65.7159H65.7142H65.7125H65.7107H65.709H65.7073H65.7056H65.7039H65.7022H65.7005H65.6988H65.6972H65.6955H65.6938H65.6922H65.6905H65.6889H65.6872H65.6856H65.684H65.6824H65.6808H65.6792H65.6776H65.676H65.6744H65.6728H65.6712H65.6696H65.6681H65.6665H65.665H65.6634H65.6619H65.6603H65.6588H65.6573H65.6557H65.6542H65.6527H65.6512H65.6497H65.6482H65.6467H65.6452H65.6438H65.6423H65.6408H65.6394H65.6379H65.6364H65.635H65.6336H65.6321H65.6307H65.6293H65.6278H65.6264H65.625H65.6236H65.6222H65.6208H65.6194H65.618H65.6166H65.6152H65.6138H65.6125H65.6111H65.6097H65.6084H65.607H65.6057H65.6043H65.603H65.6017H65.6003H65.599H65.5977H65.5963H65.595H65.5937H65.5924H65.5911H65.5898H65.5885H65.5872H65.5859H65.5846H65.5833H65.5821H65.5808H65.5795H65.5783H65.577H65.5757H65.5745H65.5732H65.572H65.5707H65.5695H65.5682H65.567H65.5658H65.5645H65.5633H65.5621H65.5609H65.5597H65.5584H65.5572H65.556H65.5548H65.5536H65.5524H65.5512H65.55H65.5488H65.5477H65.5465H65.5453H65.5441H65.5429H65.5418H65.5406H65.5394H65.5383H65.5371H65.5359H65.5348H65.5336H65.5325H65.5313H65.5302H65.529H65.5279H65.5267H65.5256H65.5245H65.5233H65.5222H65.5211H65.5199H65.5188H65.5177H65.5166H65.5154H65.5143H65.5132H65.5121H65.511H65.5099H65.5088H65.5076H65.5065H65.5054H65.5043H65.5032H65.5021H65.501H65.4999H65.4988H65.4977H65.4966H65.4945H65.4934H65.4923H65.4912H65.4901H65.489H65.4879H65.4858H65.4847H65.4836H65.4825H65.4804H65.4793H65.4782H65.4761H65.475H65.4739H65.4718H65.4707H65.4686H65.4675H65.4654H65.4643H65.4632H65.4622H65.4611H65.459H65.4579H65.4558H65.4547H65.4526H65.4515H65.4494H65.4483H65.4462H65.4451H65.443H65.4419H65.4398H65.4387H65.4366H65.4355H65.4334H65.4323H65.4312H65.4291H65.428H65.4269H65.4248H65.4237H65.4226H65.4205H65.4194H65.4183H65.4172H65.4151H65.414H65.4129H65.4118H65.4107H65.4096H65.4085H65.4074H65.4063H65.4053H65.4042H65.4031H65.402H65.4009H65.3997H65.3975H65.3964H65.3953H65.3942H65.3931H65.392H65.3909H65.3897H65.3886H65.3875H65.3864H65.3852H65.3841H65.383H65.3819H65.3807H65.3796H65.3784H65.3773H65.3762H65.375H65.3739H65.3727H65.3716H65.3704H65.3692H65.3681H65.3669H65.3658H65.3646H65.3634H65.3622H65.3611H65.3599H65.3587H65.3575H65.3563H65.3551H65.354H65.3528H65.3516H65.3504H65.3492H65.3479H65.3467H65.3455H65.3443H65.3431H65.3419H65.3406H65.3394H65.3382H65.3369H65.3357H65.3345H65.3332H65.332H65.3307H65.3295H65.3282H65.3269H65.3257H65.3244H65.3231H65.3218H65.3206H65.3193H65.318H65.3167H65.3154H65.3141H65.3128H65.3115H65.3102H65.3088H65.3075H65.3062H65.3049H65.3035H65.3022H65.3008H65.2995H65.2982H65.2968H65.2954H65.2941H65.2927H65.2913H65.29H65.2886H65.2872H65.2858H65.2844H65.283H65.2816H65.2802H65.2788H65.2774H65.2759H65.2745H65.2731H65.2716H65.2702H65.2687H65.2673H65.2658H65.2644H65.2629H65.2614H65.2599H65.2585H65.257H65.2555H65.254H65.2525H65.251H65.2494H65.2479H65.2464H65.2449H65.2433H65.2418H65.2402H65.2387H65.2371H65.2355H65.234H65.2324H65.2308H65.2292H65.2276H65.226H65.2244H65.2228H65.2212H65.2196H65.2179H65.2163H65.2147H65.213H65.2113H65.2097H65.208H65.2064H65.2047H65.203H65.2013H65.1996H65.1979H65.1962H65.1945H65.1927H65.191H65.1893H65.1875H65.1858H65.184H65.1822H65.1805H65.1787H65.1769H65.1751H65.1733H65.1715H65.1697H65.1679H65.166H65.1642H65.1624H65.1605H65.1587H65.1568H65.1549H65.1531H65.1512H65.1493H65.1474H65.1455H65.1436H65.1416H65.1397H65.1378H65.1358H65.1339H65.1319H65.1299H65.128H65.126H65.124H65.122H65.12H65.118H65.116H65.1139H65.1119H65.1098H65.1078H65.1057H65.1037H65.1016H65.0995H65.0974H65.0953H65.0932H65.0911H65.089H62.5663L61.7686 11.8795C60.7938 8.95518 58.1386 7 54.9071 7C50.6583 7 47.498 10.1603 47.498 14.4091C47.498 18.6579 50.6583 21.8183 54.9071 21.8183H58.4071V28.8183H54.9071C50.4914 28.8183 46.6147 26.9545 43.998 23.9478C41.3813 26.9545 37.5046 28.8183 33.0889 28.8183H29.5889V21.8183H33.0889C37.3377 21.8183 40.498 18.658 40.498 14.4092V14.3695C40.4784 10.1407 37.3246 7 33.089 7C29.8575 7 27.2023 8.95518 26.2275 11.8795L25.4298 14.2727H22.9071H22.905H22.9029H22.9008H22.8987H22.8966H22.8945H22.8924H22.8904H22.8883H22.8862H22.8842H22.8822H22.8801H22.8781H22.8761H22.8741H22.8721H22.8701H22.8681H22.8661H22.8642H22.8622H22.8603H22.8583H22.8564H22.8545H22.8525H22.8506H22.8487H22.8468H22.8449H22.843H22.8412H22.8393H22.8374H22.8356H22.8337H22.8319H22.83H22.8282H22.8264H22.8246H22.8228H22.821H22.8192H22.8174H22.8156H22.8139H22.8121H22.8103H22.8086H22.8068H22.8051H22.8034H22.8016H22.7999H22.7982H22.7965H22.7948H22.7931H22.7914H22.7897H22.7881H22.7864H22.7847H22.7831H22.7814H22.7798H22.7782H22.7765H22.7749H22.7733H22.7717H22.7701H22.7685H22.7669H22.7653H22.7637H22.7621H22.7605H22.759H22.7574H22.7559H22.7543H22.7528H22.7512H22.7497H22.7482H22.7467H22.7451H22.7436H22.7421H22.7406H22.7391H22.7376H22.7362H22.7347H22.7332H22.7317H22.7303H22.7288H22.7274H22.7259H22.7245H22.723H22.7216H22.7202H22.7187H22.7173H22.7159H22.7145H22.7131H22.7117H22.7103H22.7089H22.7075H22.7061H22.7048H22.7034H22.702H22.7007H22.6993H22.6979H22.6966H22.6952H22.6939H22.6926H22.6912H22.6899H22.6886H22.6873H22.6859H22.6846H22.6833H22.682H22.6807H22.6794H22.6781H22.6768H22.6755H22.6743H22.673H22.6717H22.6704H22.6692H22.6679H22.6666H22.6654H22.6641H22.6629H22.6616H22.6604H22.6592H22.6579H22.6567H22.6555H22.6542H22.653H22.6518H22.6506H22.6494H22.6481H22.6469H22.6457H22.6445H22.6433H22.6421H22.6409H22.6398H22.6386H22.6374H22.6362H22.635H22.6338H22.6327H22.6315H22.6303H22.6292H22.628H22.6268H22.6257H22.6245H22.6234H22.6222H22.6211H22.6199H22.6188H22.6176H22.6165H22.6154H22.6142H22.6131H22.612H22.6108H22.6097H22.6086H22.6075H22.6063H22.6052H22.6041H22.603H22.6019H22.6008H22.5997H22.5986H22.5974H22.5963H22.5952H22.5941H22.593H22.5919H22.5908H22.5897H22.5886H22.5865H22.5854H22.5843H22.5832H22.5821H22.581H22.5799H22.5789H22.5778H22.5767H22.5756H22.5745H22.5724H22.5713H22.5702H22.5691H22.567H22.5659H22.5649H22.5638H22.5627H22.5616H22.5595H22.5584H22.5563H22.5552H22.5542H22.5531H22.552H22.5499H22.5488H22.5467H22.5456H22.5446H22.5435H22.5424H22.5403H22.5392H22.5371H22.536H22.5339H22.5328H22.5318H22.5307H22.5296H22.5275H22.5264H22.5243H22.5232H22.5211H22.52H22.5189H22.5168H22.5157H22.5146H22.5136H22.5125H22.5114H22.5103H22.5092H22.5071H22.506H22.5049H22.5038H22.5027H22.5016H22.5005H22.4994H22.4973H22.4962H22.4951H22.494H22.4929H22.4918H22.4907H22.4896H22.4885H22.4873H22.4862H22.4851H22.484H22.4829H22.4818H22.4807H22.4795H22.4784H22.4773H22.4762H22.475H22.4739H22.4728H22.4716H22.4705H22.4694H22.4682H22.4671H22.4659H22.4648H22.4636H22.4625H22.4613H22.4602H22.459H22.4578H22.4567H22.4555H22.4543H22.4532H22.452H22.4508H22.4496H22.4484H22.4472H22.4461H22.4449H22.4437H22.4425H22.4413H22.4401H22.4389H22.4376H22.4364H22.4352H22.434H22.4328H22.4315H22.4303H22.4291H22.4279H22.4266H22.4254H22.4241H22.4229H22.4216H22.4204H22.4191H22.4178H22.4166H22.4153H22.414H22.4127H22.4115H22.4102H22.4089H22.4076H22.4063H22.405H22.4037H22.4024H22.4011H22.3998H22.3984H22.3971H22.3958H22.3944H22.3931H22.3918H22.3904H22.3891H22.3877H22.3863H22.385H22.3836H22.3822H22.3809H22.3795H22.3781H22.3767H22.3753H22.3739H22.3725H22.3711H22.3697H22.3683H22.3668H22.3654H22.364H22.3625H22.3611H22.3596H22.3582H22.3567H22.3553H22.3538H22.3523H22.3509H22.3494H22.3479H22.3464H22.3449H22.3434H22.3419H22.3404H22.3388H22.3373H22.3358H22.3342H22.3327H22.3311H22.3296H22.328H22.3265H22.3249H22.3233H22.3217H22.3201H22.3185H22.3169H22.3153H22.3137H22.3121H22.3105H22.3088H22.3072H22.3056H22.3039H22.3023H22.3006H22.2989H22.2973H22.2956H22.2939H22.2922H22.2905H22.2888H22.2871H22.2854H22.2836H22.2819H22.2802H22.2784H22.2767H22.2749H22.2731H22.2714H22.2696H22.2678H22.266H22.2642H22.2624H22.2606H22.2588H22.257H22.2551H22.2533H22.2514H22.2496H22.2477H22.2458H22.244H22.2421H22.2402H22.2383H22.2364H22.2345H22.2325H22.2306H22.2287H22.2267H22.2248H22.2228H22.2209H22.2189H22.2169H22.2149H22.2129H22.2109H22.2089H22.2069H22.2048H22.2028H22.2008H22.1987H22.1966H22.1946H22.1925H22.1904H22.1883H22.1862H22.1841H22.182H22.1799C13.931 14.2727 7.49805 20.7057 7.49805 28.9545C7.49805 32.8348 9.0028 36.6459 11.5638 39.2069L11.6272 39.2703C13.6222 41.2405 16.2742 42.7125 19.1935 43.3244C19.9511 40.5772 21.5046 38.1736 23.5754 36.4479L26.2642 34.2073L30.7455 39.5848L28.0567 41.8255C26.6784 42.9741 25.6797 44.8955 25.6797 47.1367C25.6797 50.3682 27.6349 53.0234 30.5592 53.9981L33.8796 55.1049L31.666 61.7457L28.3456 60.6389C23.5902 59.0538 20.1375 55.1783 19.046 50.406C15.3502 49.8611 11.9293 48.3796 9.09138 46.2861C8.11022 47.4971 7.49805 49.0395 7.49805 50.7727C7.49805 53.2386 8.72492 55.3724 10.5803 56.532L13.0618 58.0829L11.975 60.7999C11.4309 62.16 11.1344 63.8945 11.1344 65.3182C11.1344 73.567 17.5674 80 25.8162 80C34.065 80 40.498 73.567 40.498 65.3182Z" fill="#7A8FC8"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_392_2177">
                        <rect width="88" height="87" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <p className="font-montserratSemiBold text-center lg:text-base">Pembelajaran adalah bagian integral dari DNA kita.</p>
                    <p className="font-montserratLight">Meski tujuan utama kami adalah mempermudah proses belajar bagi mahasiswa, kami sendiri terus-menerus berkembang dan belajar. Kami juga menyediakan kesempatan bagi mahasiswa untuk mendapatkan penghasilan tambahan dengan cara yang sangat mudah.</p>
                </li>
            </ul>
        </section>
        <section className="py-10 flex justify-center bg-gradient-to-t from-[#dfe9f3] via-60% via-white to-white">
            <div className="flex flex-col items-center lg:grid lg:grid-cols-2 gap-8 lg:gap-12 text-center w-[70%] lg:w-[90%]">
                <img src={studyImage} alt="" />
                <div className="flex flex-col items-center gap-8 lg:items-start">
                    <h1 className="text-2xl font-montserratBold text-[#4A4A4A] text-center lg:text-4xl lg:text-start">Platform Berbagi Catatan Pertama Di Indonesia</h1>
                    <SquareButton colorCode="bg-[#25426C]" path="/register">Daftar Sekarang</SquareButton>
                </div>
            </div>
        </section>
        <section className="p-10 flex justify-center font-montserratSemiBold">
            <div className="bg-[rgba(122,143,200,0.1)] text-xs lg:text-base flex flex-col gap-7 p-8 rounded-3xl items-center text-center lg:text-start">
                <h4 className="text-[#2325B3] text-sm lg:text-end lg:text-lg">Benefit</h4>
                <div className="flex flex-col items-center gap-6 lg:gap-10 justify-center lg:flex-row lg:w-[90%] lg:justify-start">
                    <img src={schoolImage} className="w-20 m-1" alt="" />
                    <div>
                        <h5 className="text-[#25426C] text-base lg:text-lg lg:mb-1">Memudahkan Mencari Materi Kuliah</h5>
                        <p className="font-montserratRegular">Membantu mahasiswa dalam mencari catatan materi kuliah dengan mudah dan menginspirasi kamu untuk aktif berbagi dan mengunggah catatan kuliah.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-6 lg:gap-10 justify-center lg:flex-row lg:w-[90%] lg:justify-start">
                    <img src={partnershipImage} className="w-20 m-1" alt="" />
                    <div>
                        <h5 className="text-[#25426C] text-base lg:text-lg lg:mb-1">Memberi Penghasilan Tambahan bagi Pengunggah Catatan</h5>
                        <p className="font-montserratRegular">Memberikan peluang bagi kamu untuk mendapatkan penghasilan tambahan. Dengan mengunggah catatan kuliah, kamu tidak hanya membantu rekan mahasiswa lainnya, tetapi juga bisa mendapatkan uang dari setiap penjualan catatan yang kamu unggah.</p>
                    </div>
                </div>
            </div>
        </section>
    <Footer />
    </main>
    
    );
}

export default HomePage;