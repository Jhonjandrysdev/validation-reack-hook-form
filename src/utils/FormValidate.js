export const FormValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: "Campo obligatorio",
          },
          EmailPattern: {
            value:
              /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
          },
          URLPattern: {
            value:
            /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: "Formato de URL incorrecto",
          },
          minLength: {
            value: 6,
            message: "La contraseña requiere minimo 6 caracteres",
          },
          validateTrim : {
            trim: (value) =>{
                if(!value.trim()) {
                    return "Completa el campo correctamente"
                }
                }
          },
          ValidateEquals(getValues){
            return{
                equals: (value) =>
                value === getValues("password") ||
                "No coinciden las contraseñas",
            }
          }

    }
}
