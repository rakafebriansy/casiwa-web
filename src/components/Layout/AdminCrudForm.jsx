import { useContext, useEffect } from "react";
import SquareButton from "../Elements/SquareButton";
import TextBox from "../Fragments/TextBox";
import { modifyUserDetails } from "../../../services/util.userDetail";
import { getCookie } from "../../functions/main";
import { ShowAlertContext } from "../../contexts/ShowAlert";

const AdminCrudForm = (props) => {

    const {setIsShowAlert} = useContext(ShowAlertContext);
    const {list, setList, placeholder, columnName, prefix} = props;

    const handleStore = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminData = getCookie('admin');
        modifyUserDetails(adminData.token, 'store', prefix, formData, (data) => {
            console.log(data)
            if(data.success) {
                setList(data.data);
                e.target.reset();
                setIsShowAlert({status: true, message:data.message});
            } else {
                setIsShowAlert({status: true, message:data.message});
            }
        });
    }

    useEffect(() => {
        console.log(list)
    },[list]);

    return (
        <main className="rounded-lg small-shadow p-3 flex flex-col gap-4">
            <div className="flex flex-col border-b border-slate-200">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-y-scroll max-h-40">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">{columnName}</th>
                                    <th scope="col" className="px-3 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {list.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.name}</td>
                                            <td className="px-3 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-4 justify-start">
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Edit</button>
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleStore} className="flex flex-col items-end gap-3">
                <TextBox placeholder={placeholder} colored={true} name={columnName}>Nama Universitas</TextBox>
                <SquareButton type="submit" colorCode="bg-primary">Tambah</SquareButton>
            </form>
        </main>
    );
}

export default AdminCrudForm;