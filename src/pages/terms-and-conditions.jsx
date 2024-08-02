import { useContext, useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { LoadingIcon } from "../functions/svgs";
import { authenticatedUser } from "../../services/auth.authenticatedUser";
import { getCookie } from "../functions/main";

const TermsAndConditionsPage = () => {
    
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {anchorList} = useContext(AnchorListContext);

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
        <section className="pt-20 lg:pt-28 font-montserratRegular min-h-screen justify-between flex flex-col items-center">
            <Navbar anchors={isLogin ? anchorList[0] : []} isThisPage="Beranda" isLogin={isLogin}/>
            <main className="w-[80%] rounded-xl bg-backgroundPrime py-5">
                <h1 className="text-center font-montserratBold text-3xl select-none">Syarat dan Ketentuan</h1>
                <div className="w-full p-5">
                    <p className="mb-3 lg:mb-4">Selamat datang di CASIWA. Dengan mengakses dan menggunakan platform kami, Anda setuju untuk mematuhi Syarat dan Ketentuan berikut. Harap baca dengan cermat sebelum menggunakan layanan kami.</p>
                    <ul>
                        <li>
                            <p className="ms-3 lg:ms-4">1. Penerimaan Syarat</p>
                            <p className="ms-6 lg:ms-8">Dengan mendaftar dan menggunakan CASIWA, Anda menyatakan bahwa Anda telah membaca, memahami, dan setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan syarat-syarat ini, harap berhenti menggunakan layanan kami.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">2. Pendaftaran dan Akun</p>
                            <ul>
                                <li>
                                    <p className="ms-6 lg:ms-8">a. Informasi Akun</p>
                                    <p className="ms-9 lg:ms-12">Anda harus memberikan informasi yang akurat, lengkap, dan terbaru saat mendaftar untuk akun di CASIWA. Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda dan semua aktivitas yang terjadi di bawah akun Anda.</p>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">b. Keamanan Akun</p>
                                    <p className="ms-9 lg:ms-12">Anda setuju untuk segera memberitahu kami tentang setiap penggunaan tidak sah atas akun Anda atau pelanggaran keamanan lainnya. CASIWA tidak bertanggung jawab atas kerugian yang mungkin Anda alami akibat penggunaan tidak sah atas akun Anda.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">3. Penggunaan Layanan</p>
                            <ul>
                                <li>
                                    <p className="ms-6 lg:ms-8">a. Ketentuan Penggunaan</p>
                                    <p  className="ms-9 lg:ms-12">Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan Syarat dan Ketentuan ini. Anda tidak diperbolehkan menggunakan layanan kami untuk:</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">- Mengunggah atau mendistribusikan konten yang melanggar hak cipta, paten, merek dagang, rahasia dagang, atau hak kekayaan intelektual lainnya.</li>
                                        <li className="ms-9 lg:ms-12">- Mengunggah atau mendistribusikan konten yang melanggar hukum atau peraturan yang berlaku.</li>
                                        <li className="ms-9 lg:ms-12">- Mengunggah atau mendistribusikan virus, malware, atau kode berbahaya lainnya.</li>
                                        <li className="ms-9 lg:ms-12">- Mengganggu atau merusak operasi layanan kami atau server kami.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">b. Hak Cipta dan Kepemilikan</p>
                                    <p className="ms-9 lg:ms-12">Anda tetap memegang hak cipta atas materi yang Anda unggah ke CASIWA. Dengan mengunggah materi, Anda memberikan CASIWA hak non-eksklusif untuk menggunakan, mendistribusikan, dan menampilkan materi tersebut di platform kami.</p>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">c. Lisensi Penggunaan</p>
                                    <p className="ms-9 lg:ms-12">Pengguna lain diizinkan untuk mengunduh dan menggunakan materi Anda untuk tujuan pribadi dan non-komersial. Mereka tidak diperbolehkan menjual atau mendistribusikan ulang materi tanpa izin tertulis dari Anda.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">4. Pembayaran dan Penarikan</p>
                            <ul>
                                <li>
                                    <p className="ms-6 lg:ms-8">a. Pembelian dan Penjualan</p>
                                    <p className="ms-9 lg:ms-12">CASIWA menyediakan platform bagi pengguna untuk membeli dan menjual catatan. Semua transaksi dilakukan melalui sistem pembayaran yang aman. Harga dan metode pembayaran akan ditentukan oleh CASIWA.</p>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">b. Penarikan Dana</p>
                                    <p className="ms-9 lg:ms-12">Pengguna yang menjual catatan dapat menarik penghasilan mereka setelah mencapai ambang minimum yang ditentukan oleh CASIWA. Penarikan dana akan dilakukan melalui metode pembayaran yang disediakan, seperti transfer bank tertentu yang tersedia.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">5. Kebijakan Privasi</p>
                            <p className="ms-6 lg:ms-8">Kebijakan Privasi kami menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Dengan menggunakan layanan kami, Anda setuju dengan pengumpulan dan penggunaan informasi sesuai dengan Kebijakan Privasi kami.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">6. Pembaruan Layanan</p>
                            <p className="ms-6 lg:ms-8">CASIWA berhak untuk mengubah atau menghentikan layanan kami, sementara atau permanen, dengan atau tanpa pemberitahuan. Kami tidak bertanggung jawab kepada Anda atau pihak ketiga atas perubahan, penangguhan, atau penghentian layanan kami.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">7. Pengakhiran</p>
                            <p className="ms-6 lg:ms-8">CASIWA berhak untuk menangguhkan atau mengakhiri akses Anda ke layanan kami jika Anda melanggar Syarat dan Ketentuan ini atau terlibat dalam aktivitas yang merugikan layanan kami atau pengguna lain.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">8. Pembatasan Tanggung Jawab</p>
                            <p className="ms-6 lg:ms-8">CASIWA tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami, termasuk namun tidak terbatas pada kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">9. Hukum yang Berlaku</p>
                            <p className="ms-6 lg:ms-8">Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia. Anda setuju untuk tunduk pada yurisdiksi eksklusif pengadilan di Indonesia untuk menyelesaikan setiap sengketa yang timbul dari atau terkait dengan penggunaan layanan kami.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">10. Perubahan pada Syarat dan Ketentuan</p>
                            <p className="ms-6 lg:ms-8">CASIWA dapat memperbarui Syarat dan Ketentuan ini dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan tersebut dengan memposting syarat dan ketentuan yang diperbarui di platform kami. Anda disarankan untuk meninjau syarat dan ketentuan ini secara berkala.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">11. Kontak Kami</p>
                            <p className="ms-6 lg:ms-8">Jika Anda memiliki pertanyaan atau kekhawatiran tentang Syarat dan Ketentuan ini, silakan hubungi kami di bagian “Layanan Pelanggan” pada footer website.</p>
                        </li>
                    </ul>
                    <p className="mt-3 lg:mt-4">Dengan menggunakan CASIWA, Anda menyetujui Syarat dan Ketentuan ini dan setuju dengan ketentuan-ketentuannya.</p>
                </div>
            </main>
            <Footer/>
        </section>
    );
};

export default TermsAndConditionsPage;