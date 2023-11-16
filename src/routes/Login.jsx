import { useContext, useState } from "react";
import { userContext } from "../context/userProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorsFirebase from "../utils/ErrorsFirebase";
import FormErrors from "../components/FormErrors";
import { FormValidate } from "../utils/FormValidate";
import Title from "../components/TitleForm";
import Button from "../components/Button";
import Links from "../components/Links";
import Loader from "../components/ButtonLoader";

const Login = () => {
  const { Login } = useContext(userContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
const {register, handleSubmit, formState: {errors}, setError} = useForm()
const { required, EmailPattern, validateTrim } = FormValidate();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      await Login(email, password);
      navigate("/home");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: ErrorsFirebase(error.code),
      });
    } finally {
      setLoading(false)
    }
  };

return (
  <>
    <Title text={"Login de Usuario"}/>
    <FormErrors error={errors.firebase} />
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
    <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
      <input
        type="text"
        placeholder="Ingresa Email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register("email", {
          required,
          pattern: EmailPattern
        })}
      />
      <FormErrors error={errors.email} />
      <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register("password", {
          validate: validateTrim
        })}
      />
      <FormErrors error={errors.password} />
      {
        loading ? <Loader/> :  <Button text="Ingresar" type="submit"/>
      }
      <Links
            to="/register"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-96 flex justify-center"
            text="No tienes una cuenta? Registrate"/>
            </div>
            </form>
  </>
);}
export default Login;
