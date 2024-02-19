import { Link } from "react-router-dom"
import tiaLogo from "../assets/tia-logo.jpeg"

const Auth = () => {

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="h-[480px] w-[340px] bg-white p-4 rounded-xl flex flex-col items-center gap-2 justify-center">
                <img src={tiaLogo} alt="logo" className="w-[220px] h-[220px]" />
                <hr />
                <Link to="/login" className="bg-emerald-900 text-center text-white text-sm mb-2 font-semibold w-full py-2 rounded">LOGIN</Link>
                <p>OR</p>
                <Link to="/register" className="bg-emerald-900 text-center text-white text-sm mb-2 font-semibold w-full py-2 rounded">SIGN UP</Link>
            </div>
        </div>
    )
}

export default Auth