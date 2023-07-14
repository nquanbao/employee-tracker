const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
//Department function
const departmentFun = function () {
inquirer
  .prompt([
    {
      type: 'input',
      name: 'DepartmentOption',
      message: 'What is the name of the department?',
    }
  ])
  .then((answers) => {
    console.log(answers.DepartmentOption)
    db.query('INSERT INTO department (name) VALUES (?)',answers.DepartmentOption,function(err,result){
        if (err) {
            console.log(err);
          }
          console.log(result);
    })
    mainFun();
  });
};

//Role function
const RoleFun = function () {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'RoleOption',
          message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
          name: 'belongToDepartment',
          message: 'Which department does the role belog to?',
          choices: ['Engineering','Finance','Legal','Sales']
        }
      ])
      .then((answers) => {
        var depart = 1;
        // if(answers.belongToDepartment === "Sales"){
        //     depart = 1;
        //     return depart;
        // } else if (answers.belongToDepartment === "Engineering"){
        //     depart = 2;
        //     return depart;
        // } else if (answers.belongToDepartment === "Finance"){
        //     depart = 3;
        //     return depart;
        // } else if (answers.belongToDepartment === "Legal"){
        //     depart = 4;
        //     return depart;
        // }
        // console.log(depart)
        // console.log(answers.RoleOption)
        // console.log(answers.salary)
        // db.query('INSERT INTO role (title,department_id,salary) VALUE (?)',{answers.RoleOption,depart,answers.salary})
        // // db.query('INSERT INTO role (department_id) VALUE (?)',depart);
        // // db.query('INSERT INTO role (salary) VALUE (?)',answers.salary);
        mainFun();
      });
    };

//Employee Function
const EmployFun = function () {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstname',
          message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'list',
          name: 'employeeRole',
          message: 'What is the employee`s role?',
          choices: ['Sales Lead','Salesperson','Lead Engineer','Software Enginner','Account Manager', 'Account', 'Legal Team Lead','lawyer','None']
        }
      ])
      .then((answers) => {
        // db.query('INSERT INTO role (title,department_id,salary) VALUE (?)',)
        mainFun();
      });
    };

// main function
const mainFun = function (){
inquirer
  .prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: ['View All Employee','Add Employee','Update Employee Role','View All Roles','Add Role','View All Department','Add Department','Quit']
    }
  ])
  .then((answers) => {
    if (answers.option === "Add Employee"){
        EmployFun();
    } else if (answers.option === "View All Employee"){
        db.query('SELECT * FROM employee', function(err,results){
            console.log("Employee List:")
            console.log(results);
        })
        mainFun();
    } else if (answers.option === "View All Roles"){
        db.query('SELECT * FROM role', function(err,results){
            console.log("Role Information:")
            console.log(results);
        })
        mainFun();
    } else if (answers.option === "Add Role"){
        RoleFun();
    } else if (answers.option === "View All Department"){
        db.query('SELECT * FROM department', function(err,results){
            console.log('Department Information:')
            console.log(results);
        })
        mainFun();
    } else if (answers.option === "Add Department"){
        departmentFun();
    } else {
        console.log("Thank you!!!!!")
        return;
    }
  });
}

mainFun();
// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
