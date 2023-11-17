import { useEffect, useState } from "react"
import {db, auth} from '../firebase/FirebaseConfig';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import {nanoid} from 'nanoid';

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

    const addData = async(url) => {
        try {
            setLoading(true)
            const newDoc = {
                enabled: true,
                nanoID: nanoid(5),
                origin: url,
                uid: auth.currentUser.uid
            }
            const docRef = doc(db, "URLS", newDoc.nanoID)
            await setDoc(docRef, newDoc )
            setData([...data, newDoc ])
        } catch (error) {
            console.log(error);
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