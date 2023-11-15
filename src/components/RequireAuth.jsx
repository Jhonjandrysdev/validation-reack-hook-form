import { useContext } from "react"
import { userContext } from "../context/userProvider"
import {Navigate} from 'react-router-dom';

const RequireAuth = ({children}) => {

    const {user} = useContext(userContext)
    

    if (!user) {
       return <Navigate to="/login"/>
    }

    return children
}
export default RequireAuth