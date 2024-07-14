import { Link } from "react-router-dom"

function AuthAnchor() {
  return (
    <p className="font-montserratBold text-base">Belum memiliki akun? <Link to="/login" className="text-blue-500">Daftar disini</Link> </p>
    
  )
}

export default AuthAnchor