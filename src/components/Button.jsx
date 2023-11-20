import Loader from "./ButtonLoader"

const Button = ({text, type, loading, onClick, className}) => { 
    
    if(loading) return <Loader/>

    return(
        <button  
        type={type}
        onClick={onClick}
        className={className}>{text}</button> 
        )
         
    }
    export default Button