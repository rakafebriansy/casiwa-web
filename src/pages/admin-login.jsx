import { useContext } from "react";
import FormLogin from "../components/Layout/FormLogin";
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";

const AdminLoginPage = () => {
    const {isShowAlert} = useContext(ShowAlertContext);
    
    return (
        <section className="min-h-screen w-full flex justify-center items-center">
        {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <FormLogin admin={true}/>
        </section>
    );
}

export default AdminLoginPage;