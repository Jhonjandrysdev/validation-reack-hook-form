import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase/FirebaseConfig"

export const userContext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)

    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth,user => {
            console.log(user);
            if (user) {
                const {email, uid} = user
                setUser({email, uid})
            } else {
                setUser(null)
            }
        } )

        return() => unSuscribe()
    },[])

    const Register = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const Login = (email, password) => 
    signInWithEmailAndPassword(auth, email, password)

    const SignOut = () => signOut(auth)

    return(
        <>
        <userContext.Provider value={{user, setUser, Register, Login, SignOut}}>
            {props.children}
        </userContext.Provider>    
        </>
    )
}
export default UserProvider