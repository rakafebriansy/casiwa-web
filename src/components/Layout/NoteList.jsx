import { Link } from "react-router-dom";
import {BinIcon, DownloadCountIcon, PencilIcon} from "../../functions/svgs"

const NoteList = (props) => {
    const {item, index, isUpload = false, onEdit, onDelete, isAdmin = false} = props;
    return (
        <li key={index} className="flex flex-col gap-4 bg-white rounded-lg small-shadow items-center p-4">
            <div className="flex relative w-full justify-start items-start gap-4">
                <div className="h-24 w-24 flex justify-center items-center border">
                    <img src={import.meta.env.VITE_BASE_URL + 'preview/' + item.thumbnail_name} className="h-full" alt="" />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                    <Link to={(isAdmin ? '/admin' : '') + `/note-details/${item.id}`} className="text-sm font-montserratSemiBold hover:text-blue-500">{item.title}</Link>
                    <p className="text-xs">{item.study_program + ' • ' + item.university + ' • ' + item.date}</p>
                </div>
                {isUpload && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-3">
                        <PencilIcon onclick={onEdit} classname="w-8 cursor-pointer p-1 rounded-full hover:bg-slate-100"/>
                        <BinIcon onclick={onDelete} classname="w-8 cursor-pointer p-1 rounded-full hover:bg-slate-100"/>
                    </div>
                )}
            </div>
            <div className="flex justify-end border-t border-slate-300 w-full py-1">
                <div className="flex gap-1 items-center">
                    <DownloadCountIcon classname="w-2 lg:w-3"/>
                    <span className="text-xs lg:text-sm">{item.download_count}</span>
                </div>
            </div>
        </li>
    );
};

export default NoteList;