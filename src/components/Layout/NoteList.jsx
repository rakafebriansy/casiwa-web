import { Link } from "react-router-dom";
import {DownloadCountIcon} from "../../functions/svgs"

const NoteList = (props) => {
    const {list = [], preview} = props;
    return (
        <ul className="flex flex-col gap-5">
            {list.map(item => {
                return (
                    <li id={item.id} className="flex flex-col gap-4 bg-white rounded-lg small-shadow items-center p-4">
                        <div className="flex w-full justify-start items-start gap-4">
                            <div className="h-24 w-24 flex justify-center items-center border">
                                <img src={preview} className="h-full" alt="" />
                            </div>
                            <div className="flex flex-col gap-1 justify-center">
                                <Link to="#" className="text-sm font-montserratSemiBold hover:text-blue-500">Rangkuman Transformasi Geometri Matematika Murni</Link>
                                <p className="text-xs">Statistika • Universitas Jember • 2024</p>
                            </div>
                        </div>
                        <div className="flex justify-end border-t border-slate-300 w-full py-1">
                            <div className="flex gap-1 items-center">
                                <DownloadCountIcon classname="w-2 lg:w-3"/>
                                <span className="text-xs lg:text-sm">8</span>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default NoteList;