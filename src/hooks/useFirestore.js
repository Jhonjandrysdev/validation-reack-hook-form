import { useEffect, useState } from "react"
import {db, auth} from '../firebase/FirebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {

        try {
            setLoading(true)
            const dataRef = collection(db, "URLS")
            const q = query(dataRef, where("uid", "==", auth.currentUser.uid ))
            const data = await getDocs(q)
            const dataDB = data.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))
            setData(dataDB)
        } catch (error) {
            console.log(error);
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const addData = async() => {
        try {
            setLoading(true)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {
        data,
        error,
        loading,
        addData
    }
}