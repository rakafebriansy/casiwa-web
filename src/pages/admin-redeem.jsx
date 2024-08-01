import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { ShowAlertContext } from "../contexts/ShowAlert";
import Footer from "../components/Layout/Footer";
import { getCookie } from "../functions/main";
import { authenticatedAdmin } from "../../services/auth.authenticatedUser";
import { LoadingIcon } from "../functions/svgs";
import { useNavigate } from "react-router-dom";
import { getAdminRedeemHistories, getUnpaidRedeem, redeemUser } from "../../services/auth.redeem";
import Modal from "../components/Elements/Modal";
import Alert from "../components/Elements/Alert";

const AdminRedeemPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();
    const [unpaidRedeem, setUnpaidRedeem] = useState([]);
    const [clickedItem, setClickedItem] = useState({});
    const [redeemHistories, setRedeemHistories] = useState([]);
    const refModal = useRef(null);
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);

    const handleRedeem = (decision,id) => {
        const formData = new FormData();
        const userData = getCookie('admin');
        formData.append('id',id);
        formData.append('decision',decision);
        if(userData) {
            redeemUser(formData, userData.token, (data) => {
                if(data.success) {
                    setIsShowAlert({status: true, message:data.message});
                } else {
                    setIsShowAlert({status: true, message:data.message});
                }
            })
        }
    }

    useEffect(() => {
        const userData = getCookie('admin');
        if(userData) {
            getUnpaidRedeem(userData.token,(data) => {
                setUnpaidRedeem(data.data);
            });
            getAdminRedeemHistories(userData.token,(data) => {
                setRedeemHistories(data.data);
            });
            authenticatedAdmin(userData.token,
                res => {
                    setIsLogin(res.data.success);
                }, 
                err => {
                    console.log('Unauthenticated');
                    navigate('/login');
            },
            () => {
                setIsLoading(false);
            });
        } else {
            navigate('/login');
        }
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
        <section className="pt-20 lg:pt-28 font-montserratRegular min-h-screen justify-between flex flex-col items-center">
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            {isLogin && (
            <>
                <Navbar isAdmin={true} anchors={anchorList[1]} isThisPage="Redeem" isLogin={true}/>
                    <main className="lg:grid lg:grid-cols-3 flex flex-col items-center w-[80%] gap-6 lg:gap-10">
                        <div className="flex col-span-1 overflow-x-scroll lg:overflow-auto w-full">
                            <div className="flex col-span-1 w-full bg-white border rounded-lg">
                                <div className="overflow-x-auto w-full">
                                    <div className="p-1.5 min-w-full inline-block align-middle w-full h-full">
                                        <div className="overflow-y-scroll max-h-40 h-full">
                                            <table className="min-w-full divide-y divide-gray-200 h-full dark:divide-neutral-700">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-3 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase dark:text-neutral-500">Nama</th>
                                                        <th scope="col" className="px-3 py-3 text-xs font-montserratMedium text-gray-500 uppercase dark:text-neutral-500 text-start">Total</th>
                                                        <th scope="col" className="px-3 py-3 text-xs font-montserratMedium text-gray-500 uppercase dark:text-neutral-500 text-start">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                    {unpaidRedeem.length > 0 ? (
                                                        <>
                                                        {unpaidRedeem.map(item => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800 dark:text-neutral-200">{`${item.first_name} ${item.last_name}`}</td>
                                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800 dark:text-neutral-200">{item.total}</td>
                                                                <td className="px-3 py-4 whitespace-nowrap text-end text-sm font-montserratMedium flex gap-4 justify-start">
                                                                    <button type="button" onClick={() => {
                                                                        setClickedItem(item);
                                                                        refModal.current.classList.replace('hidden','flex');
                                                                    }} className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border text-white bg-blue-500">Detail</button>
                                                                    <button onClick={() => handleRedeem(1,item.id)} type="button" className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border text-white bg-green-500">Terima</button>
                                                                    <button onClick={() => handleRedeem(0,item.id)} type="button" className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border text-white bg-red-500">Tolak</button>
                                                                </td>
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
                        <div className="flex col-span-2 overflow-x-scroll lg:overflow-auto w-full">
                            <div className="flex col-span-2 bg-white border rounded-lg">
                            <div className="overflow-x-auto w-full h-full">
                                <div className="p-1.5 min-w-full inline-block align-middle h-full">
                                <div className="overflow-y-scroll max-h-40 h-full">
                                    <table className="min-w-full divide-y divide-gray-200 h-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">No. Pembayaran</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Tanggal</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Nominal</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase">Nama</th>
                                        </tr>
                                    </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {redeemHistories.length > 0 ? (
                                                <>
                                                {redeemHistories.map(item => {
                                                    return (
                                                        <tr className={`${item.status == 'accepted' ? 'bg-blue-100' : 'bg-red-500 text-white'}`}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.datetime}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.total}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name}</td>
                                                        </tr>
                                                    );
                                                })}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
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
                <Footer/>
                <Modal ref={refModal} title="Detail Pengguna">
                    <table>
                        <tbody className="align-top">
                            <tr>
                                <td className="p-1">Nama:</td>
                                <td className="p-1">{clickedItem.first_name + ' ' + clickedItem.last_name}</td>
                            </tr>
                            <tr>
                                <td className="p-1">Total:</td>
                                <td className="p-1">{clickedItem.total}</td>
                            </tr>
                            <tr>
                                <td className="p-1">No. Rekening:</td>
                                <td className="p-1">{clickedItem.account_number + ' (' + clickedItem.bank_name + ')'}</td>
                            </tr>
                            <tr>
                                <td className="p-1">Foto KTP:</td>
                                <td className="p-1">
                                    <img src={import.meta.env.VITE_BASE_URL + 'ktp/' + clickedItem.ktp_image} alt="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            </>
            )}
        </section>
    );
}

export default AdminRedeemPage;