import {Router} from 'express';

import authorize from "../middlewares/authorize.js";
import {validation} from "../middlewares/validation.js";
import schema from "../schemas/tasksSchema.js";
import {createTask, deleteTask, getAllTasks, getTaskById, updateTask} from "../controllers/taskController.js";

const router = Router();


router.get('/:id',
  authorize,
  getTaskById
);

router.get('/',
  validation(schema.getAllTasks),
  authorize,
  getAllTasks
);


router.post('/create',
  validation(schema.createTask),
  authorize,
  createTask
);


router.put(
  '/:id',
  validation(schema.updateTask),
  authorize,
  updateTask
);


router.delete('/:id', authorize, deleteTask);


export default router;
