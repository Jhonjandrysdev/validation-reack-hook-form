import Loader from "./ButtonLoader"

const Button = ({text, type, loading, onClick}) => { 
    
    if(loading) return <Loader/>

    return(
        <button  
        type={type}
        onClick={onClick}
        className={`text-white bg-red-600 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-600 dark:border-red-600 mt-4 w-96`}>{text}</button> 
        )
         
    }
    export default Button