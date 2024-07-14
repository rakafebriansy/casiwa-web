import { Link } from "react-router-dom"

const AuthAnchor = (props) => {
    const {hasAnAccount} = props;
    return (
      <p className="font-montserratBold text-base"> {hasAnAccount ? 'Belum memiliki akun?' : 'Sudah memiliki akun?'} <Link to={hasAnAccount ? '/register' : '/login'} className="text-blue-500">{hasAnAccount ? 'Daftar' : 'Masuk'} disini</Link> </p>
    );
}

export default AuthAnchor