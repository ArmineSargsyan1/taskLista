import joi from "joi";

export default {
  createTask: {
    body: joi.object({
      title: joi.string().min(3).max(255).required(),
      description: joi.string().max(1000).optional(),
      taskDate: joi.date()
        .iso()
        .required()
        .messages({
          'date.base': 'Task date must be a valid date',
          'date.format': 'Task date must be in ISO format (YYYY-MM-DD)',
          'any.required': 'Task date is required',
        }),
    }),

    // params: joi.object({})
  },

  updateTask: {
    body: joi.object({
      title: joi.string().min(5).max(40).required(),
      description: joi.string().min(20).max(50).required(),
      taskDate: joi.date()
        .iso()
        .required()
        .messages({
          'date.base': 'Task date must be a valid date',
          'date.format': 'Task date must be in ISO format (YYYY-MM-DD)',
          'any.required': 'Task date is required',
        }),
      completed: joi.boolean()
        .default(false)
        .messages({
          'boolean.base': 'Completed must be a boolean value',
        }),
    }),

  },


  getAllTasks: {
    params: joi.object({
      page: joi.number().integer().min(1).optional(),
      limit: joi.number().integer().min(1).max(100).optional(),
      id: joi.string().optional()
    }).unknown(false)
  }


}







