import globe from '../../assets/images/globe.png'

const Hero = () => {
    return (
        <div className="font-montserratBold w-full flex flex-col gap-10">
            <div className="text-base">
                <p className="text-[#596280]">CASIWA</p>
                <div className="text-3xl">
                    <p>SOLUSI <span className="text-secondary">BELAJAR</span></p>
                    <p><span className="text-secondary">SAMBIL</span> BEKERJA</p>
                </div>
                <p className="text-[#00293F] font-montserratRegular text-sm">Layanan Berbagi Catatan Mahasiswa</p>
            </div>
            <div className="w-full">
                <img src={globe} className="w-full" alt="" />
            </div>
        </div>
    );
}

export default Hero;