import { useContext } from "react"
import { userContext } from "../context/userProvider"
import {Navigate, Outlet} from 'react-router-dom';

const LayoutRequireAuth = () => {

    const {user} = useContext(userContext)
    

    if (!user) {
       return <Navigate to="/"/>
    }

    return (
        <div className="mx-auto container">
            <Outlet/>
        </div>
    )
}
export default LayoutRequireAuth