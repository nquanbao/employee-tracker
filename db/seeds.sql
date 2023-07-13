INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO role (id, title, department_id, salary)
VALUES (1, "Sale lead","Sales", 100000),
       (2, "Saleperson","Sales", 80000),
       (3, "Lead Engineer","Engineering", 150000),
       (4, " Software Engineer","Engineering", 120000),
       (5, "Account Manager","Finance", 160000),
       (6, "Accountant","Finance", 125000),
       (7, "Legal Team Lead","Legal", 250000),
       (8, "Lawyer","Legal", 190000);

INSERT INTO employee (id,first_name,last_name,role_id) 
VALUES (1, "John","Doe",1),
       (2, "Mike","Chan",2),
       (3, "Ashley","Rodgiquez",3),
       (4, "Kevin","Tupik",4),
       (5, "Kunal","Singh",5),
       (6, "Malia","Brown",6),
       (7, "Sarah","Lourd",7),
       (8, "Tom","Allen",8); 