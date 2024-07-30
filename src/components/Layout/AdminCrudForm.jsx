import { useContext, useEffect, useRef } from "react";
import SquareButton from "../Elements/SquareButton";
import TextBox from "../Fragments/TextBox";
import { modifyUserDetails } from "../../../services/util.userDetail";
import { getCookie } from "../../functions/main";
import { ShowAlertContext } from "../../contexts/ShowAlert";
import Modal from "../Elements/Modal";

const AdminCrudForm = (props) => {

    const {setIsShowAlert} = useContext(ShowAlertContext);
    const {list, setList, placeholder, columnName, prefix, label} = props;
    const refEditModal = useRef(null);
    const refDeleteModal = useRef(null);

    const handleStore = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminData = getCookie('admin');
        modifyUserDetails(adminData.token, 'store', prefix, formData, (data) => {
            if(data.success) {
                setList(data.data);
                setIsShowAlert({status: true, message:data.message});
            } else {
                setIsShowAlert({status: true, message:data.message});
            }
        }, err => {
            setIsShowAlert({status: true, message:err.message});
        }, () => {
            e.target.reset();
        });
    }

    const openEditModal = (id, label) => {
        refEditModal.current.querySelector('#editId').value = id;
        refEditModal.current.querySelector('#editLabel').innerText = label;
        refEditModal.current.classList.replace('hidden','flex')
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminData = getCookie('admin');
        modifyUserDetails(adminData.token, 'edit', prefix, formData, (data) => {
            if(data.success) {
                setList(data.data);
                setIsShowAlert({status: true, message:data.message});
            } else {
                setIsShowAlert({status: true, message:data.message});
            }
        }, err => {
            setIsShowAlert({status: true, message:err.message});
        }, () => {
            e.target.reset();
            refEditModal.current.classList.replace('flex','hidden');
        });
    }

    const openDeleteModal = (id, label) => {
        refDeleteModal.current.querySelector('#deleteId').value = id;
        refDeleteModal.current.querySelector('#deleteLabel').innerText = `Apakah anda yakin untuk menghapus ${label}`;
        refDeleteModal.current.classList.replace('hidden','flex');
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminData = getCookie('admin');
        modifyUserDetails(adminData.token, 'delete', prefix, formData, (data) => {
            if(data.success) {
                setList(data.data);
                setIsShowAlert({status: true, message:data.message});
            } else {
                setIsShowAlert({status: true, message:data.message});
            }
        }, err => {
            setIsShowAlert({status: true, message:err.message});
        }, () => {
            e.target.reset();
            refDeleteModal.current.classList.replace('flex','hidden');
        });
    }

    return (
        <>
        <main className="rounded-lg small-shadow p-3 flex flex-col gap-4 font-montserratRegular">
            <div className="flex flex-col border-b border-slate-200">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-y-scroll max-h-40">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-montserratMedium text-gray-500 uppercase dark:text-neutral-500">{columnName}</th>
                                        <th scope="col" className="px-3 py-3 text-xs font-montserratMedium text-gray-500 uppercase dark:text-neutral-500 text-start">aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {list.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm font-montserratMedium text-gray-800 dark:text-neutral-200">{item.name}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-end text-sm font-montserratMedium flex gap-4 justify-start">
                                                    <button type="button" onClick={() => openEditModal(item.id, item.name)} className="inline-flex items-center gap-x-2 text-sm font-montserratSemiBold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Edit</button>
                                                    <button type="button" onClick={() => openDeleteModal(item.id, item.name)} className="inline-flex items-center gap-x-2 text-sm font-montserratSemiBold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
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
                <TextBox placeholder={placeholder} colored={true} name={columnName}>Nama {label}</TextBox>
                <SquareButton type="submit" colorCode="bg-primary">Tambah</SquareButton>
            </form>
        </main>
        <Modal ref={refEditModal} title="Edit" accept="Ubah" onsubmit={handleEdit}>
            <p className="font-montserratSemiBold mb-4 text-sm" id="editLabel"></p>
            <input type="hidden" name="id" id="editId"/>
            <TextBox placeholder={placeholder} colored={true} name={columnName}>{`Nama ${label} baru`}</TextBox>
        </Modal>
        <Modal ref={refDeleteModal} title="Hapus" accept="Hapus" onsubmit={handleDelete} danger={true}>
            <p className="font-montserratSemiBold text-sm" id="deleteLabel"></p>
            <input type="hidden" name="id" id="deleteId"/>
        </Modal>
        </>
    );
}

export default AdminCrudForm;