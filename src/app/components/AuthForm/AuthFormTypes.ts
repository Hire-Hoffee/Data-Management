import { z } from "zod";

const minMsg = "Минимум 3 символа";
const maxMsg = "Максимум 30 символов";

const strValidation = z.string().min(3, { message: minMsg }).max(30, { message: maxMsg });

const authValidationSchema = z.object({
  username: strValidation,
  password: strValidation,
});

export { authValidationSchema };
