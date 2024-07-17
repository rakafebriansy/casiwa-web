import trophy from '../../assets/images/trophy.png'

const DottedCard = () => {
    return (
        <div className="w-[50%] hover:shadow-xl dotted-card text-[#4A4A4A] hover:bg-secondary rounded-[2.5rem] box-border transition hover:border-secondary hover:border-dashed p-5 flex flex-col gap-5 justify-between  items-center text-[0.7rem]">
            <div className="w-[20%]">
                <svg width="30" className='w-full' height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_367_2382)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.498047 0H3.99805H14.8979H18.3979H61.5979H65.0979H75.9981H79.4981V3.5V21.5C79.4981 25.2926 77.9915 28.9299 75.3098 31.6116C72.628 34.2934 68.9907 35.8 65.1981 35.8H64.8528C64.0976 41.1635 61.6207 46.174 57.7463 50.0484C53.872 53.9227 48.8616 56.3996 43.498 57.1549V64.8H47.198C51.9453 64.8 56.4983 66.6859 59.8552 70.0428C63.2121 73.3997 65.0979 77.9527 65.0979 82.7001V86.2001H61.5979H18.3979H14.8979V82.7001C14.8979 77.9527 16.7838 73.3997 20.1407 70.0428C23.4976 66.6859 28.0506 64.8 32.798 64.8H36.498V57.1549C31.1345 56.3997 26.1239 53.9227 22.2496 50.0484C18.3752 46.174 15.8983 41.1635 15.1431 35.8H14.798C11.0055 35.8 7.36819 34.2934 4.68642 31.6116C2.00465 28.9299 0.498047 25.2926 0.498047 21.5V3.5V0ZM7.49805 7H14.8979V28.8H14.798C12.862 28.8 11.0052 28.0309 9.63617 26.6619C8.26715 25.2929 7.49805 23.4361 7.49805 21.5V7ZM65.0979 28.8V7H72.4981V21.5C72.4981 23.4361 71.729 25.2929 70.36 26.6619C68.991 28.0309 67.1342 28.8 65.1981 28.8H65.0979ZM21.8979 7V32.3C21.8979 37.1004 23.8049 41.7042 27.1993 45.0986C30.5937 48.493 35.1975 50.4 39.9979 50.4C44.7984 50.4 49.4022 48.493 52.7966 45.0986C56.191 41.7042 58.0979 37.1004 58.0979 32.3V7H21.8979ZM25.0905 74.9926C27.1346 72.9484 29.9071 71.8 32.798 71.8H47.198C50.0888 71.8 52.8613 72.9484 54.9054 74.9926C56.0998 76.187 56.9884 77.63 57.5207 79.2001H22.4752C23.0075 77.63 23.8961 76.187 25.0905 74.9926Z" fill="#7A8FC8"/>
                </g>
                <defs>
                <clipPath id="clip0_367_2382">
                <rect width="80" height="87" fill="white"/>
                </clipPath>
                </defs>
                </svg>
            </div>
            <p className="font-montserratRegular text-center">Tujuan kami adalah memberikan dampak positif dan nyata kepada pengguna kami.</p>
            <p className="font-montserratLight">Kami berkomitmen untuk menciptakan sistem belajar yang mudah dan bermanfaat, dan terus menantang diri kami untuk membuat perbedaan.</p>
        </div>
    );
}

export default DottedCard;