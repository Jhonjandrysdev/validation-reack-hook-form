const ErrorsFirebase = (code) => {
    switch (code) {
        case "auth/email-already-in-use":
            return "Usuario ya registrado" 
        case "auth/ivalid-email":
            return "Formato no valido"
            case "auth/invalid-login-credentials":
                return "Correo o contraseña incorrecta"
        default:
            return "Ocurrio un error en el servidor"
        }
}
export default ErrorsFirebase