import { useContext } from "react";
import { userContext } from "../context/userProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorsFirebase from "../utils/ErrorsFirebase";
import FormErrors from "../components/FormErrors";
import { FormValidate } from "../utils/FormValidate";

const Login = () => {
  const { Login } = useContext(userContext);
  const navigate = useNavigate();
const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
const { required, EmailPattern, validateTrim } = FormValidate();

  const onSubmit = async ({ email, password }) => {
    try {
      await Login(email, password);
      navigate("/home");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: ErrorsFirebase(error.code),
      });
    }
  };

return (
  <>
    <Link to="/register">Registro</Link>
    <h1>Login</h1>
    <FormErrors error={errors.firebase} />
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Ingresa Email"
        {...register("email", {
          required,
          pattern: EmailPattern
        })}
      />
      <FormErrors error={errors.email} />
      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        {...register("password", {
          validate: validateTrim
        })}
      />
      <FormErrors error={errors.password} />
      <button type="submit">Acceder</button>
    </form>
  </>
);}
export default Login;
