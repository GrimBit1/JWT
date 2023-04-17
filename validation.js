const yup = require("yup");

//Validation

const registerValidation = (data) => {
  const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  return registerSchema.validateSync(data);
};


const loginValidation = (data) => {
  const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  return loginSchema.validateSync(data);
};

module.exports = {registerValidation,loginValidation}