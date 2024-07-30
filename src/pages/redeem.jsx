import { useContext, useEffect, useState } from "react";
import { ShowAlertContext } from "../contexts/ShowAlert";
import { AnchorListContext } from "../contexts/AnchorList";
import Navbar from "../components/Layout/Navbar";
import Alert from "../components/Elements/Alert";
import Footer from "../components/Layout/Footer";
import SquareButton from "../components/Elements/SquareButton";
import { formatCurrency, getCookie } from "../functions/main";
import { authenticatedProfile } from "../../services/auth.authenticatedUser";
import { getUserBalance } from "../../services/util.userDetail";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../functions/svgs";

const RedeemPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [balance, setBalance] = useState(0);
    const [redeem, setRedeem] = useState(100000);
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();

    const handleDecrease = () =>  {
        if(redeem > 100000) {
            setRedeem(redeem - 100000);
        }
    }

    const handleIncrease = () =>  {
        if(redeem < (balance - 100000)) {
            setRedeem(redeem + 100000);
        }
    }

    useEffect(() => {
        const userData = getCookie('user');
        if(userData) {
            authenticatedProfile(userData.token,
                res => {
                    if(res.data.data.account_number && res.data.data.ktp_image && res.data.data.bank.id) {
                        setIsLogin(res.data.success);
                    } else {
                        navigate('/profile');
                    }
            }, 
            err => {
                console.log('Unauthenticated');
                navigate('/login');
            }, 
            () => {
                setIsLoading(false);
            });
        }
    },[]);

    useEffect(() => {
        const userData = getCookie('user');
        getUserBalance(userData.token,(data) => {
            setBalance(data.data);
        });
    },[balance]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
       <section className="min-h-screen flex-col w-full pt-28 flex justify-between items-center relative">
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <Navbar anchors={anchorList[0]} isThisPage="Redeem" isLogin={true}/>
            <main className="w-[80%] flex flex-col gap-12">
                <div className="flex w-full justify-center text-center items-center">
                    <div className="h-24 w-full font-montserratSemiBold text-2xl border-2 shadow-inner bg-backgroundPrime border-primary rounded-2xl flex justify-center items-center">
                        <h1>Anda belum dapat me-redeem poin anda</h1>
                    </div>
                </div>
                <div className="w-full grid grid-cols-3">
                    <div className="flex col-span-1 justify-between">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200 text-lg">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-montserratMedium text-gray-800">
                                            Saldo anda: Rp {formatCurrency(balance,'id-ID')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 flex justify-center gap-4 items-center whitespace-nowrap font-montserratMedium text-gray-800">
                                            <button onClick={handleDecrease} className="font-bold bg-slate-100 hover:bg-slate-300 w-6 h-6 flex justify-center items-center rounded-full">-</button>
                                            <p>Rp <span>100.000</span></p>
                                            <button onClick={handleIncrease} className="font-bold bg-slate-100 hover:bg-slate-300 w-6 h-6 flex justify-center items-center rounded-full">+</button></td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 flex justify-center whitespace-nowrap text-sm font-montserratMedium text-gray-800">
                                            <SquareButton type="submit" colorCode="bg-primary">Redeem</SquareButton>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end col-span-2">
                        <div className="overflow-x-auto w-full">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">No. Pembayaran</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Tanggal</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Nominal</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-montserratMedium text-gray-500 uppercase">Admin</th>
                                    </tr>
                                </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800">John Brown</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">45</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">New York No. 1 Lake Park</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-montserratMedium">
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-montserratSemiBold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800">Jim Green</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">27</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">London No. 1 Lake Park</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-montserratMedium">
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-montserratSemiBold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800">Joe Black</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">31</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Sidney No. 1 Lake Park</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-montserratMedium">
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-montserratSemiBold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
       </section>
    )
}

export default RedeemPage;