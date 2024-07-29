import FormLogin from "../components/Layout/FormLogin";

const AdminLoginPage = () => {
    return (
        <section className="min-h-screen w-full flex justify-center items-center">
            <FormLogin admin={true}/>
        </section>
    );
}

export default AdminLoginPage;