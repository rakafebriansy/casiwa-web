import { useContext, useEffect, useState } from "react";
import { ShowAlertContext } from "../contexts/ShowAlert";
import { AnchorListContext } from "../contexts/AnchorList";
import Navbar from "../components/Layout/Navbar";
import Alert from "../components/Elements/Alert";
import Footer from "../components/Layout/Footer";
import SquareButton from "../components/Elements/SquareButton";
import { formatCurrency, getCookie } from "../functions/main";
import { authenticatedProfile } from "../../services/auth.authenticatedUser";
import { getRedeemHistories, redeem } from "../../services/auth.redeem";
import { getUserBalance } from "../../services/util.userDetail";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../functions/svgs";

const RedeemPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [balance, setBalance] = useState(0);
    const [total, setTotal] = useState(100000);
    const [redeemHistories, setRedeemHistories] = useState([]);
    const {isShowAlert,setIsShowAlert} = useContext(ShowAlertContext);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();

    const handleDecrease = () =>  {
        if(total > 100000) {
            setTotal(total - 100000);
        }
    }

    const handleIncrease = () =>  {
        if(total <= (balance - 100000)) {
            setTotal(total + 100000);
        }
    }

    const handleRedeem = (e) => {
        e.preventDefault();

        const userData = getCookie('user');
        if(userData) {
            const formData = new FormData();
            formData.append('total',total);
            redeem(formData, userData.token, (data) => {
                if(data.success) {
                    setBalance(balance - total);
                    setIsShowAlert({status: true, message:data.message});
                } else {
                    setIsShowAlert({status: true, message:data.message});
                }
            })
        }
    }

    useEffect(() => {
        const userData = getCookie('user');
        if(userData) {
            getRedeemHistories(userData.token,(data) => {
                setRedeemHistories(data.data);
            });
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

    if (isLoading && !isLogin) return (
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
                    <div className={`${balance < 100000 ? 'bg-red-100 border-red-600 text-red-600' : 'bg-backgroundPrime border-primary text-primary' } h-24 w-full font-montserratSemiBold text-2xl border-2 shadow-inner  rounded-2xl flex justify-center items-center`}>
                        {balance < 100000 && (
                            <h1>Anda belum dapat me-redeem poin anda</h1>
                        )}
                        {balance >= 100000 && (
                            <h1>Anda dapat me-redeem poin anda</h1>
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5 items-start lg:grid lg:grid-cols-3">
                    <div className="flex w-full lg:col-span-1 justify-between">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <form onSubmit={handleRedeem} className="border rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="divide-y divide-gray-200 text-lg">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-montserratMedium text-gray-800">
                                                Saldo anda: Rp {formatCurrency(balance,'id-ID')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 flex justify-center gap-4 items-center whitespace-nowrap font-montserratMedium text-gray-800">
                                                <button type="button" onClick={handleDecrease} className={`font-bold select-none bg-slate-100  w-6 h-6 flex justify-center items-center rounded-full ${total <= 100000 ? 'cursor-default' : 'hover:bg-slate-300'}`}>-</button>
                                                <p>Rp <span>{formatCurrency(total,'id-ID')}</span></p>
                                                <button type="button" onClick={handleIncrease} className={`font-bold select-none bg-slate-100 w-6 h-6 flex justify-center items-center rounded-full ${total > (balance - 100000) ? 'cursor-default' : 'hover:bg-slate-300'}`}>+</button></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 flex justify-center whitespace-nowrap text-sm font-montserratMedium text-gray-800">
                                                <SquareButton disabled={balance < 100000} type="submit" colorCode="bg-primary">Redeem</SquareButton>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end lg:col-span-2">
                        <div className="overflow-x-auto w-full">
                            <div className="min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">No. Pembayaran</th>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Tanggal</th>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Nominal</th>
                                    </tr>
                                </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {redeemHistories.length > 0 ? (
                                            <>
                                                {redeemHistories.map(item => {
                                                    return (
                                                        <tr>
                                                            <td className="px-3 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800">{item.id}</td>
                                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">{item.datetime}</td>
                                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">{item.total}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">
                                                    Tidak ada hasil.
                                                </td>
                                            </tr>
                                        )}
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