import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { TickIcon } from '../functions/svgs';
import SquareButton from '../components/Elements/SquareButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getProveOfPayment } from '../../services/util.payment';
import { getCookie } from '../functions/main';
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';


const TestPage = () => {
    const {idParams} = useParams();
    const [time, setTime] = useState(6);
    const [paid, setPaid] = useState(false);
    const navigate = useNavigate();
    const refCountdown = useRef(null);

    useEffect(() => {
        const userData = getCookie('user');
        if(userData) {
            getProveOfPayment(userData.token, idParams, 
                data => {
                    if(data.data.status == 'paid'){
                        navigate('/note-details/' + idParams);
                    }
                },
                err => {
                    console.log(err);
                }
            )
        } else{
            navigate('/login');
        }
    },[]);

    useEffect(() => {
        if(paid) {
            if(time === 0) {
                setTime(6)
            }
    
            if(refCountdown.current.classList.contains('hidden') && time <= 3) {
                refCountdown.current.classList.replace('hidden','flex');
            }
    
            const countdown = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
    
            return () => clearInterval(countdown);
        }
    },[paid, time, navigate]);
    


    if (paid == false) return (<h1>Loading...</h1>);

    return (
        <>
        <main className="flex justify-center items-center min-h-screen relative">
            <div className="w-72 spread-shadow box-border p-6 flex flex-col gap-4 items-center">
                <div className="flex flex-col justify-between items-center font-montserratRegular gap-6 text-xs w-full">
                    <h1 className='text-primary text-xl font-montserratSemiBold'>Pembayaran Berhasil</h1>
                    <TickIcon classname="fill-primary w-12"/>
                    <table className='align-middle w-full'>
                        <tbody>
                        <tr>
                            <td>Waktu transaksi</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Jenis Pembayaran</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Judul Catatan</td>
                            <td></td>
                        </tr>
                        <tr className='font-montserratSemiBold'>
                            <td>Jumlah yang dibayarkan</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <SquareButton path={`/note-details/${idParams}`} type="link">Kembali</SquareButton>
                </div>
            </div>
            <div ref={refCountdown} className="top-0 z-20 hidden left-0 w-full h-full fixed text-center items-center justify-center">
                <div className="bg-black opacity-40 w-full h-full absolute top-0 left-0"></div>
                <div className="z-20 text-white flex flex-col gap-2">
                    <h4>Anda akan diarahkan ulang ke halaman sebelumnya...</h4>
                    <h1 className='text-7xl font-montserratBold'>{time}</h1>
                </div>
            </div>
        </main>
        </>
    );
};

export default TestPage;