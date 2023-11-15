import { useContext, useState } from "react";
import { userContext } from "../context/userProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';

const Register = () => {

const { Register } = useContext(userContext);
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm();


  const onSubmit = async(data) => {
           try {
            await Register(data.email, data.password);
            console.log("Usuario registrado");
            console.log(data);
            navigate("/home")
           } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("email", {
                        message: "Usuario ya registrado"
                    })
                    break;
                    case "auth/ivalid-email":
                    setError("email", {
                        message: "Formato de email no valido"
                    })
                    break;
                default:
                    console.log("Ocurrio un error en el servidor");
            }
           }
         };


  return (
    <>
      <Link to="/">Login</Link>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="Ingresa Email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Formato de email incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            setValueAs: (value) => value.trim(),
            minLength: {
              value: 6,
              message: "La contraseña requiere minimo 6 caracteres",
            },
            validate: {
                trim: (value) =>{
                    if(!value.trim())
                    return "Completa el campo correctamente"
                    }
                }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          name=""
          placeholder="Ingresa tu contraseña"
          {...register("repassword", {
            setValueAs: (value) => value.trim(),
            validate: {
              equals: (value) =>
                value === getValues("password") ||
                "No coinciden las contraseñas",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};
export default Register;
