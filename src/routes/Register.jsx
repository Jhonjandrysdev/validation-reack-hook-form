import { useContext, useState } from "react";
import { userContext } from "../context/userProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { Register } = useContext(userContext);

const {register, handleSubmit,  formState:{errors}} = useForm()
const onSubmit = (data) => console.log(data);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Registrando usuario");
//     try {
//       await Register(email, password);
//       console.log("Usuario registrado");
//     } catch (error) {
//       console.log(error);
//     }
//   };
  return (
    <>
      <Link to="/">Login</Link>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="Ingresa Email"
        {...register("email", {required:{
            value:true,
            message: "Campo obligatorio"
        }})}
        />
        {errors.email && errors.email.message}

        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {minLength:{
            value: 6,
            message: "La contraseña requiere minimo 6 caracteres"
          }})}
        />
        {errors.password && errors.password.message}
<input
          type="password"
          name=""
          placeholder="Ingresa tu contraseña"
          {...register("repassword")}
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};
export default Register;
