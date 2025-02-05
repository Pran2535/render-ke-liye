import Joi from "joi";

export const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot exceed 50 characters",
      "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and special character",
        "any.required": "Password is required",
      }),
  });

  return schema.validate(data);
};

export const validateExpense = (data) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required().messages({
      "number.positive": "Amount must be a positive number",
      "any.required": "Amount is required",
    }),
    category: Joi.string()
      .valid("Food", "Travel", "Entertainment", "Utilities", "Other")
      .required()
      .messages({
        "any.only": "Invalid category selected",
        "any.required": "Category is required",
      }),
    date: Joi.date().max("now").required().messages({
      "date.max": "Date cannot be in the future",
      "any.required": "Date is required",
    }),
    description: Joi.string().max(500).optional().messages({
      "string.max": "Description cannot exceed 500 characters",
    }),
  });

  return schema.validate(data);
};
