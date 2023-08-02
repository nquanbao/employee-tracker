INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, department_id,salary)
VALUES ("Sale lead",1, 100000),
       ("Saleperson",1, 80000),
       ("Lead Engineer",2, 150000),
       ("Software Engineer",2, 120000),
       ("Account Manager",3, 160000),
       ("Accountant",3, 125000),
       ("Legal Team Lead",4, 250000),
       ("Lawyer",4, 190000);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John Doe','Smith',1,NULL),
       ('Jane Smith','Brown',2,1),
       ('Tom Johnson','Lee',3,1),
       ('Sarah Lee','Williams',4,2),
       ('David Kim','Chen',5,1),
       ('Mike Yang','Liu',6,3),
       ('Karen Chen','Wu',5,1);