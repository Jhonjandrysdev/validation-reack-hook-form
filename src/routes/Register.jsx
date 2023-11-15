import { useContext } from "react";
import { userContext } from "../context/userProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorsFirebase from "../utils/ErrorsFirebase";
import { FormValidate } from "../utils/FormValidate";
import FormErrors from "../components/FormErrors";

const Register = () => {
  const { Register } = useContext(userContext);
  const navigate = useNavigate();
  const { required, EmailPattern, minLength, validateTrim, ValidateEquals } = FormValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await Register(data.email, data.password);
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
      <Link to="/">Login</Link>
      <h1>Register</h1>
      <FormErrors error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="Ingresa Email"
          {...register("email", {
            required,
            pattern: EmailPattern,
          })}
        />
        <FormErrors error={errors.email} />

        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim
          })}
        />
        <FormErrors error={errors.password} />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("repassword", {
            validate: ValidateEquals(getValues)
          })}
        />
        <FormErrors error={errors.repassword} />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};
export default Register;
