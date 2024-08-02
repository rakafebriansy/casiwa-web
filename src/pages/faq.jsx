import { useContext, useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { DownArrowIcon, LoadingIcon } from "../functions/svgs";
import { authenticatedUser } from "../../services/auth.authenticatedUser";
import { getCookie } from "../functions/main";
import { getFaqs } from "../../services/util.faqs";

const FaqPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [faqs, setFaqs] = useState([]);
    const {anchorList} = useContext(AnchorListContext);

    useEffect(()=> {
        getFaqs((data) => {
            setFaqs(data.data);
        });
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
        <section className="pt-20 lg:pt-28 font-montserratRegular min-h-screen justify-between flex flex-col items-center">
            <Navbar anchors={isLogin ? anchorList[0] : []} isThisPage="Beranda" isLogin={isLogin}/>
            <main className="w-[80%] rounded-xl bg-backgroundPrime py-5">
                <h1 className="text-center font-montserratBold text-3xl select-none">FAQs</h1>
                <ul className="w-full p-5 flex flex-col items-center font-montserratRegular gap-3">
                    {faqs.length > 0 && faqs.map((item, i) => {
                        return (
                            <li key={i} className="flex flex-col items-start overflow-hidden w-full">
                                <div className="flex gap-3 cursor-pointer w-full justify-between select-none" onClick={() => {
                                    const p = document.querySelector('#p-' + i);
                                        if(p.classList.contains('hidden')) {
                                            p.classList.replace('hidden','block');
                                            p.classList.replace('-translate-y-full','translate-y-0');
                                        } else {
                                            p.classList.replace('block','hidden');
                                            p.classList.replace('translate-y-0','-translate-y-full');
                                        }
                                        document.querySelector('#i-' + i).classList.toggle('rotate-180');
                                    }}>
                                    <h4 className="font-semibold">{item.question}</h4>
                                    <DownArrowIcon id={'i-' + i} classname="w-3"/>
                                </div>
                                <p id={'p-' + i} className="-translate-y-full hidden">{item.answer}</p>
                        </li>
                        );
                    })}
                </ul>
            </main>
            <Footer/>
        </section>
    );
}

export default FaqPage;