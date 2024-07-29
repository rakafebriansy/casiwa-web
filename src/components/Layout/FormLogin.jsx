import Signature from "../Fragments/Signature";
import TextBox from "../Fragments/TextBox";
import InputCheckBox from "../Elements/InputCheckBox";
import LongRoundedButton from "../Elements/LongRoundedButton";
import AuthAnchor from "../Elements/AuthAnchor";
import { useNavigate } from "react-router-dom";
import { adminLogin, login } from "../../../services/auth.login.jsx";
import { useContext } from "react";
import { ShowAlertContext } from "../../contexts/ShowAlert";
import { setCookie } from "../../functions/main";

const FormLogin = (props) => {
    const {admin} = props;
    const {setIsShowAlert} = useContext(ShowAlertContext);
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        if(admin) {
            adminLogin(data,(data) => {
                if(data.success) {
                    navigate('/admin-dashboard');
                }
            },(err) =>{
                setIsShowAlert({status: true, message:err.message});
            });
        } else {
            if(e.target.rememberme.value) {
                data.rememberme =e.target.rememberme.value;
            }
            login(data,(data) => {
                if(data.success) {
                    let time = 0.5;
                    if(data.rememberme) {
                        time = 30;
                    }
                    setCookie('user',{
                        email: data.email,
                        token: data.token
                    },time);
                    navigate('/');
                }
            },(err) =>{
                setIsShowAlert({status: true, message:err.message});
            });
        }
    };

    return (
        <>
        <form onSubmit={handleLogin} className="w-[70%] h-[70%] flex flex-col items-center justify-between md:w-[28rem] md:border md:py-8 md:px-12 md:items-start md:rounded-xl md:shadow-lg bg-white">
            <div className="flex flex-col items-center justify-between gap-2 md:items-start">
                <Signature isAuth={true} classname="lg:hidden"/>
                <h1 className="font-montserratBold text-secondary text-3xl mt-4">{admin ? 'MASUK ADMIN' : 'MASUK'}</h1>
                <p className="text-center">{admin ? 'Masukkan kredensial!' : 'Selamat datang, silahkan masuk!'}</p>
            </div>
            <div className="w-full flex flex-col items-start gap-3 my-6">
                <TextBox name="email">{admin ? 'Username' : 'Email'}</TextBox>
                <TextBox name="password" type="password">Kata Sandi</TextBox>
                {!admin && (
                    <div className="flex gap-4 items-center">
                        <InputCheckBox name="rememberme" id="checkbox-rememberme"/>
                        <label htmlFor="checkbox-rememberme" className="cursor-pointer select-none">Ingat Saya</label>
                    </div>
                )}
                <LongRoundedButton colorCode="bg-primary mt-2">MASUK</LongRoundedButton>
            </div>
            {!admin && (
                <div className="w-full flex justify-center">
                    <AuthAnchor hasAnAccount={true}/>
                </div>
            )}
        </form>
        </>
    );
}

export default FormLogin;