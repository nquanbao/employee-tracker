const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const {prompt} = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
//Question when run inquirer
const questions = [
  {
    type: "list",
    name: "task",
    message: "What do you want to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit"
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?',
    when: ({task}) => task == 'Add a department'
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the role?',
    when: ({task}) => task == 'Add a role'
  },
  {
    type: 'number',
    name: 'salary',
    message: 'How much does this position earn per year? (Enter as number)',
    when: ({task}) => task == 'Add a role'
  },
  {
    type: 'list',
    name: 'department_id',
    message: 'Which department will be assigned with this role?',
    choices: async() => getDepts(),
    when: ({task}) => task == 'Add a role'
  },
  {
    type: 'input',
    name: 'first_name',
    message: "What is the employee's first name?",
    when: ({task}) => task == 'Add an employee'
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What is the employee's last name?",
    when: ({task}) => task == 'Add an employee'
  },
  {
    type: 'list',
    name: 'id',
    message: "Which employee do you want to update?",
    choices: async() => getEmps(),
    when: ({task}) => task == 'Update an employee role'
  },
  {
    type: 'list',
    name: 'role_id',
    message: "What is the employee's new role?",
    choices: async() => getRoles(),
    when: ({task}) => task == 'Add an employee' || task == 'Update an employee role'
  },
  {
    type: 'list',
    name: 'manager_id',
    message: "Who is the employee's manager?",
    choices: async() => getEmps(),
    when: ({task}) => task == 'Add an employee' || task == 'Update an employee role'
  },
];
//Function for each option in inquirer
viewDepts = () =>
db
  .promise()
  .query("SELECT * FROM department")
  .then(([data]) => {
    console.table(data);
  });

viewRoles = () =>
db
  .promise()
  .query(
    `
SELECT
    r.id,
    r.title,
    r.salary,
    d.name 'department'
FROM role r
JOIN department d 
ON r.department_id = d.id
`
  )
  .then(([data]) => {
    console.table(data);
  });

viewEmps = () =>
db
  .promise()
  .query(
    `
  SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name "department",
    r.salary,
    concat(e2.first_name, " ", e2.last_name) AS "manager"
  FROM employee AS e
  JOIN role AS r
  ON e.role_id = r.id
  JOIN department AS d
  ON r.department_id = d.id
  LEFT JOIN employee AS e2
  ON e.manager_id = e2.id
`
  )
  .then(([data]) => {
    console.table(data);
  });

addDept = async ({ name }) => {
db.promise().query(`INSERT INTO department SET ?`, { name });
};

getDepts = async () => {
let [data] = await db
  .promise()
  .query('SELECT name, id AS "value" FROM department');
return data;
};

getRoles = async () => {
let [data] = await db
  .promise()
  .query('SELECT title AS name, id AS "value" FROM role');
return data;
};

getEmps = async () => {
let [data] = await db
  .promise()
  .query(
    'SELECT CONCAT(first_name," ",last_name) AS name, id AS "value" FROM employee'
  );
data.push({ name: "Null", value: null });

return data;
};

addRole = async ({ title, salary, department_id }) => {
let [data] = await db
  .promise()
  .query(
    "INSERT INTO role SET ?",
    { title, salary, department_id },
    (err) => {
      if (err) return console.log(err);
      return;
    }
  );
};

addEmp = async ({ first_name, last_name, role_id, manager_id }) => {
await db
  .promise()
  .query(
    "INSERT INTO employee SET ?",
    { first_name, last_name, role_id, manager_id },
    (err) => {
      if (err) return err;
      return;
    }
  );
};

updateRole = async ({ role_id, manager_id, id}) => {

await db
  .promise()
  .query("UPDATE employee SET ? WHERE ?", [{role_id},{manager_id},{id}], (err) => {
    if (err) return err;
    return;
  });
};

//Function to run inquirer
const init = () =>
  prompt(questions)
  .then(answer => {
    let {task} = answer;
    
    switch (task) {
      case 'View all departments': return viewDepts().then(init);
      case 'View all roles': return viewRoles().then(init);
      case 'View all employees': return viewEmps().then(init);
      case 'Add a department': return addDept(answer).then(init);
      case 'Add a role': return addRole(answer).then(init);
      case 'Add an employee': return addEmp(answer).then(init);
      case 'Update an employee role': return updateRole(answer).then(init);
      case 'Quit': return console.log('Thank you!!!!!!');
    }
  });

init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
