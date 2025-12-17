import dbConnection from "../clients/db.mysql.js";

export const createTask = async (
  {id,userId, title,description, taskDate, completed}) => {
  await dbConnection.execute(
    `INSERT INTO tasks (id, userId, title, description, completed, taskDate)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      title,
      description ?? null,
      completed ?? false,
      taskDate,
    ]
  );

  return {id, userId, title, description, completed: Boolean(completed), taskDate};
};


export const getAllTasksByUser = async (userId, limit, offset) => {
  const [rows] = await dbConnection.execute(
    `SELECT *
     FROM tasks
     WHERE userId = ?
     ORDER BY taskDate ASC
     LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  );

  return rows;
};

export const getTotalTasksCountByUser = async (userId) => {
  const [rows] = await dbConnection.query(
    `SELECT COUNT(*) AS count FROM tasks WHERE userId = ?`,
    [userId]
  );

  return rows[0].count;
};


export const getTaskById = async (id, userId) => {
  const [rows] = await dbConnection.execute(
    `SELECT *
     FROM tasks
     WHERE id = ? AND userId = ?`,
    [id, userId]
  );
  console.log(rows,2222)
  return rows[0];
};


export const updateTask = async (id, userId, data) => {
  const { title, description, completed, taskDate } = data;

  await dbConnection.execute(
    `UPDATE tasks
     SET title = ?, description = ?, completed = ?, taskDate = ?
     WHERE id = ? AND userId = ?`,
    [title, description, completed, taskDate, id, userId]
  );

  return getTaskById(id, userId);
};


export const deleteTask = async (id, userId) => {
  const [result] = await dbConnection.execute(
    'DELETE FROM tasks WHERE id = ? AND userId = ?',
    [id, userId]
  );
  return result.affectedRows > 0;
};

export const getTaskCountByDateAndUser = async (taskDate, userId) => {
  const [rows] = await dbConnection.execute(
    `SELECT COUNT(*) AS count
     FROM tasks
     WHERE DATE(taskDate) = DATE(?) AND userId = ?`,
    [taskDate, userId]
  );

  return rows[0]?.count ?? 0;
};
