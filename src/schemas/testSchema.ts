import joi from "joi";

export const newTestSchema = joi.object({
  name: joi.string().min(4).required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required()
});