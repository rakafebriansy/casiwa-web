import { useEffect } from "react";
import SquareButton from "../Elements/SquareButton";
import TextBox from "../Fragments/TextBox";

const AdminCrudForm = (props) => {

    const {list, placeholder, columnName, prefix} = props;

    const handleStore = (event, callback) => {
        event.preventDefault();
        callback();
    }

    useEffect(() => {
        console.log(list)
        console.log('ok')
    },[]);

    return (
        <form onSubmit={handleStore} className="rounded-lg small-shadow p-3 flex flex-col gap-4">
            <div class="flex flex-col border-b border-slate-200">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope="col" class="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">{columnName}</th>
                                    <th scope="col" class="px-3 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                                {list.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.name}</td>
                                            <td class="px-3 py-4 whitespace-nowrap text-end text-sm font-medium flex gap-4 justify-start">
                                                <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Edit</button>
                                                <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
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
            <div className="flex flex-col items-end gap-3">
                <TextBox placeholder={placeholder} colored={true} name={columnName}>Nama Universitas</TextBox>
                <SquareButton type="submit" colorCode="bg-primary">Tambah</SquareButton>
            </div>
        </form>
    );
}

export default AdminCrudForm;