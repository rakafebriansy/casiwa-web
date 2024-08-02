import { useContext, useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { LoadingIcon } from "../functions/svgs";
import { authenticatedUser } from "../../services/auth.authenticatedUser";
import { getCookie } from "../functions/main";

const PrivacyPoliciesPage = () => {
    
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
                <h1 className="text-center font-montserratBold text-3xl select-none">Kebijakan Privasi</h1>
                <div className="w-full p-5">
                    <p className="mt-2 lg:mb-4">Di CASIWA, kami sangat menghargai privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan platform kami. Dengan menggunakan layanan CASIWA, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.</p>
                    <ul>
                        <li>
                            <p className="ms-3 lg:ms-4">1. Informasi yang Kami Kumpulkan</p>
                            <ul>
                                <li>
                                    <p className="ms-6 lg:ms-8">a. Informasi Pribadi</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Registrasi Akun: Saat Anda membuat akun di CASIWA, kami mengumpulkan informasi seperti nama, alamat email, nomor telepon, dan informasi lainnya yang diperlukan untuk mengidentifikasi dan menghubungi Anda.</li>
                                        <li className="ms-9 lg:ms-12">Pembayaran: Untuk transaksi pembelian atau penjualan catatan, kami mungkin mengumpulkan informasi pembayaran, seperti nomor rekening bank Anda untuk tujuan transfer dana.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">b. Informasi Non-Pribadi</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Data Penggunaan: Kami mengumpulkan informasi tentang bagaimana Anda menggunakan platform kami, termasuk halaman yang Anda kunjungi, waktu yang Anda habiskan di halaman tersebut, dan tindakan lain yang Anda lakukan.</li>
                                        <li className="ms-9 lg:ms-12">Log File: Seperti banyak situs web lainnya, kami mengumpulkan informasi yang terdapat di log file, termasuk alamat IP, jenis browser, penyedia layanan internet (ISP), halaman rujukan/keluar, dan cap tanggal/waktu.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">2. Penggunaan Informasi</p>
                            <ul>
                                <li>
                                    <p className="ms-6 lg:ms-8">a. Untuk Menyediakan dan Meningkatkan Layanan</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Mengelola akun dan menyediakan layanan yang Anda minta.</li>
                                        <li className="ms-9 lg:ms-12">Memproses transaksi dan mengirimkan konfirmasi.</li>
                                        <li className="ms-9 lg:ms-12">Menyediakan dukungan pelanggan dan merespons permintaan Anda.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">b. Untuk Komunikasi</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Mengirimkan informasi tentang layanan kami, pembaruan, penawaran khusus, dan promosi.</li>
                                        <li className="ms-9 lg:ms-12">Mengirimkan pemberitahuan terkait aktivitas akun Anda, seperti perubahan nama profil atau pembaruan kebijakan.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">c. Untuk Analisis dan Pengembangan</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Menganalisis data untuk memahami bagaimana layanan kami digunakan dan untuk mengembangkan fitur baru serta meningkatkan layanan yang ada.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">3. Perlindungan Informasi</p>
                            <p className="ms-6 lg:ms-8">Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Ini termasuk enkripsi data selama transmisi dan penyimpanan, serta penggunaan firewall dan sistem deteksi intrusi.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">4. Berbagi Informasi</p>
                            <li>
                                <p className="ms-6 lg:ms-8">a. Dengan Penyedia Layanan</p>
                                <ul>
                                    <li className="ms-9 lg:ms-12">Kami dapat berbagi informasi pribadi Anda dengan penyedia layanan pihak ketiga yang membantu kami dalam menyediakan layanan kami, seperti pemrosesan pembayaran dan analisis data.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="ms-6 lg:ms-8">b. Untuk Kepatuhan Hukum</p>
                                <ul>
                                    <li className="ms-9 lg:ms-12">Kami dapat mengungkapkan informasi pribadi Anda jika diwajibkan oleh hukum atau jika kami percaya bahwa tindakan tersebut diperlukan untuk mematuhi perintah pengadilan, proses hukum, atau melindungi hak, properti, atau keselamatan kami atau orang lain.</li>
                                </ul>
                            </li>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">5. Hak Anda</p>
                            <p className="ms-6 lg:ms-8">Anda memiliki hak untuk mengakses, mengoreksi, atau menghapus informasi pribadi Anda yang kami simpan. Anda juga dapat menolak pemrosesan informasi pribadi Anda dalam keadaan tertentu. Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang disediakan di footer website.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">6. Hak Cipta dan Kepemilikan Dokumen</p>
                            <ul>
                                <li>
                                    <p className="ms-6 lg:ms-8">a. Kepemilikan Hak Cipta</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Pengunggah dokumen di CASIWA tetap memegang hak cipta penuh atas materi yang mereka unggah. Dengan mengunggah dokumen, Anda memberikan CASIWA hak non-eksklusif untuk menggunakan, mendistribusikan, dan menampilkan dokumen tersebut di platform kami.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">b. Tanggung Jawab Pengguna</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Pengguna bertanggung jawab memastikan bahwa dokumen yang mereka unggah tidak melanggar hak cipta atau hak kekayaan intelektual pihak ketiga. Jika terdapat klaim pelanggaran hak cipta, CASIWA berhak menghapus dokumen tersebut dan mengambil tindakan yang diperlukan sesuai dengan hukum yang berlaku.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="ms-6 lg:ms-8">c. Lisensi Penggunaan</p>
                                    <ul>
                                        <li className="ms-9 lg:ms-12">Dengan mengunggah dokumen ke CASIWA, Anda memberikan lisensi kepada pengguna lain untuk mengunduh dan menggunakan dokumen tersebut untuk tujuan pribadi dan non-komersial. Pengguna lain tidak diperbolehkan menjual atau mendistribusikan ulang dokumen tanpa izin tertulis dari pemilik hak cipta.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">7. Perubahan pada Kebijakan Privasi</p>
                            <p className="ms-6 lg:ms-8">Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami atau untuk alasan operasional, hukum, atau peraturan lainnya. Kami akan memberitahu Anda tentang perubahan tersebut dengan memposting kebijakan yang diperbarui di platform kami dan memperbarui tanggal "Terakhir Diperbarui" di bagian atas kebijakan ini.</p>
                        </li>
                        <li>
                            <p className="ms-3 lg:ms-4">8. Hubungi Kami</p>
                            <p className="ms-9 lg:ms-12">Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini atau praktik privasi kami, silahkan hubungi kami di bagian “Layanan Pelanggan” pada footer website.</p>
                        </li>
                    </ul>
                    <p className="mt-3 lg:mt-4">Dengan menggunakan CASIWA, Anda menyetujui Kebijakan Privasi ini dan setuju dengan ketentuan-ketentuannya.</p>
                </div>
            </main>
            <Footer/>
        </section>
    );
};

export default PrivacyPoliciesPage;