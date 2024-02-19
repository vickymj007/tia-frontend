import { useDispatch, useSelector } from "react-redux";
import tiaLogo from "../assets/tia-logo.jpeg";
import { AppDispatch, Rootstate } from "../redux/store";
import { logout, setUsers } from "../redux/userSlice";
import { useEffect } from "react";
import axios from "axios";

type User = {
  _id: string,
  name: string,
  email: string,
  password: string,
  loginCount: number,
  isActive: boolean,
}

const Home = () => {
  const user = useSelector((state: Rootstate) => state.user.user)
  const { users } = useSelector((state: Rootstate) => state.user)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if (user?.isAdmin) {
      axios.post(`${import.meta.env.VITE_BASE_URL}/admin/get-users`, { email: user.email, password: user.password })
        .then(res => {
          dispatch(setUsers(res.data.users));
        })
        .catch(err => {
          if (axios.isAxiosError(err)) {
            console.log(err.response?.data.message)
          } else {
            console.log("Something went wrong!");
          }
        })
    }

  }, [])


  return (
    <div className="min-h-screen w-full p-20 max-sm:p-8">
      <div className="text-white">
        <img src={tiaLogo} alt="logo" className="w-[220px] mb-4" />
        <h1 className="text-2xl mb-4">{user?.isAdmin ? "Admin Profile" : "User Profile"}</h1>
        <p>User : {user?.name}</p>
        <p>Email : {user?.email}</p>
        <button onClick={() => dispatch(logout())} className="bg-black px-3 py-1 rounded hover:bg-neutral-950">Logout</button>
      </div>
      <div className="w-full mt-6 flex justify-center">
        {user?.isAdmin ?
          <div className="mx-auto overflow-x-scroll rounded-lg">
            <table className=" bg-slate-100">
              <thead className="bg-slate-600 text-white">
                <tr>
                  <th className="px-2 py-2"><input type="checkbox" /></th>
                  <th className="px-2 py-1">#</th>
                  <th className="px-4 py-1">Name</th>
                  <th className="px-4 py-1">Email</th>
                  <th className="px-4 py-1">Status</th>
                  <th className="px-4 py-1">Password</th>
                  <th className="px-4 py-1">Login Count</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: User, index: number) => (
                  <tr key={user._id} className={`${index % 2 === 0 ? "bg-slate-100" : "bg-slate-300"}`}>
                    <th ><input type="checkbox" /></th>
                    <td >{index + 1}</td>
                    <td >{user.name}</td>
                    <td >{user.email}</td>
                    <td className="px-2 py-2">{user.isActive ? <span className="rounded-lg bg-green-500 py-1 px-2">Active</span> : <span className="rounded-lg bg-red-500 py-1 px-2">Inactive</span>}</td>
                    <td >{user.password}</td>
                    <td >{user.loginCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          : <p className="text-white mt-4 text-3xl">Welcome to Tia Info Tech</p>
        }
      </div>
    </div>
  )
}

export default Home