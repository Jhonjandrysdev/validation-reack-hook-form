import {useContext, useState} from 'react';
import {userContext} from '../context/userProvider';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {

    const {Login} = useContext(userContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Ingresando Usuario");
        try {
           await Login(email,password)
            navigate("/home")
           console.log("Usuario Ingresado");
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <div>
            <Link to="/register">Registro</Link>
            <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" placeholder="Ingresa Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value) }/>

            <input type="password" name="" id=""
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value) }/>
            <button type="submit">Acceder</button>
        </form>
        </>
    )
}
export default Login