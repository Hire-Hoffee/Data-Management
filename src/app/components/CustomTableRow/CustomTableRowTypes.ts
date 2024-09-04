import { z } from "zod";

const minMsg = "Минимум 3 символа";
const maxMsg = "Максимум 30 символов";
const invalidDate = "Невалидная дата";

const dateTimeValidation = z.string().refine((date) => !isNaN(Date.parse(date)), {
  message: invalidDate,
});
const strValidation = z.string().min(3, { message: minMsg }).max(30, { message: maxMsg });

const validationSchema = z.object({
  id: z.string(),
  documentStatus: strValidation,
  employeeNumber: strValidation,
  documentType: strValidation,
  documentName: strValidation,
  companySignatureName: strValidation,
  employeeSignatureName: strValidation,
  employeeSigDate: dateTimeValidation,
  companySigDate: dateTimeValidation,
});

export { validationSchema };
