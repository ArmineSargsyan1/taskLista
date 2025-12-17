import { Router } from 'express';

import users from "./users.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express NODE 2',
    userName: 'Valod',
  });
});

router.use('/users', users);
router.use('/tasks', taskRoutes);
export default router;
