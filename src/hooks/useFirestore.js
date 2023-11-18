import { useEffect, useState } from "react"
import {db, auth} from '../firebase/FirebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import {nanoid} from 'nanoid';

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {

        try {
            setLoading(prev => ({...prev, getData:true}))
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
            setLoading(prev => ({...prev, getData:false}))
        }
    }

    const addData = async(url) => {
        try {
            setLoading(prev => ({...prev, addData:true}))
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
            setLoading(prev => ({...prev, addData:false}))
        }
    }

    const deleteData =  async(nanoID) => {
        try {
            setLoading(prev => ({...prev, addData:true}))
            const docRef = doc(db, "URLS", nanoID)
            await deleteDoc(docRef)
            setData(data.filter(e => e.nanoID !== nanoID))
            
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading(prev => ({...prev, addData:false}))
        }
    }

    const UpdateData = async(nanoID, newOrigin) => {
        try {
            setLoading(prev => ({...prev, UpdateData:true}))
            const docRef = doc(db, "URLS", nanoID)
            await updateDoc(docRef, {origin: newOrigin})
            setData(data.map(item => item.nanoID === nanoID ? ({...item, origin: newOrigin}) : item))
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading(prev => ({...prev, UpdateData:false}))
        }
    }
    return {
        data,
        error,
        loading,
        addData,
        deleteData,
        UpdateData
    }
}