import { useContext, useState } from "react";
import { userContext } from "../context/userProvider";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorsFirebase from "../utils/ErrorsFirebase";
import { FormValidate } from "../utils/FormValidate";
import FormErrors from "../components/FormErrors";
import Title from "../components/TitleForm";
import Button from "../components/Button";
import Links from "../components/Links";
import Loader from "../components/ButtonLoader";

const Register = () => {
  const { Register } = useContext(userContext);
  const navigate = useNavigate();
  const { required, EmailPattern, minLength, validateTrim, ValidateEquals } =
    FormValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const [loading, setLoading] = useState(false)


  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await Register(data.email, data.password);
      <Loader/>
      navigate("/home");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: ErrorsFirebase(error.code),
      });
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Title text={"Registro de Usuario"} />
      <FormErrors error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 ">
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
              pattern: EmailPattern,
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
              minLength,
              validate: validateTrim,
            })}
          />
          <FormErrors error={errors.password} />
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your repassword
          </label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("repassword", {
              validate: ValidateEquals(getValues),
            })}
          />
          <FormErrors error={errors.repassword} />
          
            <Button text="Ingresar" type="submit" loading={loading}/>
          
            </div>
      </form>
    </>
  );
};
export default Register;
