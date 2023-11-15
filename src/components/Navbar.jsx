import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userContext } from "../context/userProvider"

const Navbar = () => {
    const {SignOut, user} = useContext(userContext)
    const navigate = useNavigate()

    const handleOut = async() => {
        try {
            await SignOut() 
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        
        <div>
            {
                user && (<> 
                <button onClick={handleOut}>Logout</button>
                </>)
            }
            
            
        </div>
        </>
        
    )
}
export default Navbar