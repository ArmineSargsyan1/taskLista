import {v4 as uuid} from 'uuid';
import * as taskModel from '../models/taskModel.js';

export const createTask = async (req, res) => {
  const {title, description, taskDate} = req.body;

  const userId = req.userId;

  const count = await taskModel.getTaskCountByDateAndUser(taskDate, userId);
  if (count >= 3)
    return res.status(400).json({
      error: 'Օրվա համար թույլատրված է առավելագույնը 3 task'
    });

  const task = await taskModel.createTask({
    id: uuid(),
    userId,
    title,
    description,
    taskDate,
    completed: false
  });

  res.status(201).json(task);
};


export const getAllTasks = async (req, res) => {
  const userId = req.userId;

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const tasks = await taskModel.getAllTasksByUser(userId, limit, offset);
  const totalTasks = await taskModel.getTotalTasksCountByUser(userId);

  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: tasks,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasksPerPage: limit,
    },
  });
};

export const getTaskById = async (req, res) => {
  const {id} = req.params;
  const userId = req.userId;

  const task = await taskModel.getTaskById(id, userId);
  if (!task)
    return res.status(404).json({error: 'Task not found'});

  res.json(task);
};


export const updateTask = async (req, res) => {
  const {id} = req.params;
  const userId = req.userId;

  const existing = await taskModel.getTaskById(id, userId);
  if (!existing)
    return res.status(404).json({error: 'Task not found'});

  const updated = await taskModel.updateTask(id, userId, req.body);

  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Task updated successfully',
    data: updated,
  });

};

export const deleteTask = async (req, res) => {
  const {id} = req.params;
  const userId = req.userId;

  const success = await taskModel.deleteTask(id, userId);
  if (!success)
    return res.status(404).json({error: 'Task not found'});

  res.json({message: 'Թասկը հեռացված է'});
};






