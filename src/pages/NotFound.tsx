import { Link } from "react-router-dom"


const NotFound = () => {
    return (
        <div >
            <h1 className="text-white pt-10 text-center text-4xl">Oops..</h1>
            <p className="text-white pt-10 text-center text-xl">The Page you are looking is not found.. <Link to="/login" className=" bg-black text-white px-3 py-1 rounded-md">Go Back</Link></p>

        </div>
    )
}

export default NotFound