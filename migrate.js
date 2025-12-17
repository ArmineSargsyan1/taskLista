import db from "./clients/db.mysql.js";

(async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(36) PRIMARY KEY,
      userId VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      taskDate DATE NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log("Database");
})();






// import dbConnection from "./clients/db.mysql.js";
//
// (async () => {
//   await dbConnection.query(`
//   CREATE TABLE IF NOT EXISTS users (
//     id VARCHAR(36) PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   );
// `);
//
//
//   await dbConnection.query(`
//     CREATE TABLE IF NOT EXISTS tasks (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       user_id INT NOT NULL,
//       title VARCHAR(255) NOT NULL,
//       description TEXT,
//       status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
//       due_date DATE,
//       createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//     );
//   `);
//
// })();
