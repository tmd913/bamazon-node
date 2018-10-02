const mysql = require("mysql");
const inquirer = require("inquirer");
const {table} = require('table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                choices: [
                    "View Product Sales by Department",
                    "Create New Department"
                ],
                message: "Choose an action:"
            }
        ])
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewDepartmentSales();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;

                default:
                    break;
            }
        });
}

function viewDepartmentSales() {
    connection.query(
        `
        SELECT 
        	a.*, 
            SUM(b.product_sales) AS product_sales,
            SUM(b.product_sales) - a.over_head_costs AS total_profit
        FROM departments a
        LEFT JOIN products b
        ON a.department_name = b.department_name
        GROUP BY 
        	a.department_id, 
            a.department_name, 
            a.over_head_costs;
        `,
        function (err, res) {
            let data = [
                ["Department ID", "Department Name", "Overhead Costs ($)", "Product Sales ($)", "Total Profit ($)"]
            ];
            res.forEach(element => {
                let row = [
                    element.department_id, 
                    element.department_name, 
                    element.over_head_costs, 
                    element.product_sales, 
                    element.total_profit
                ];
                data.push(row);
            });
            createTable(data);
            connection.end();
        }
    );
}

function createNewDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?"
            },
            {
                name: "overhead",
                type: "input",
                message: "What is the overhead cost for this department?"
            }
        ])
        .then(function (answer) {
            connection.query(
                `
                INSERT INTO departments (department_name, over_head_costs)
                VALUES (?, ?)
                `,
                [
                    answer.department, 
                    answer.overhead
                ],
                function (err, res) {
                    console.log("New department added...");
                    connection.end();
                }
            );
        });
}

function createTable(data) {
    let output = table(data);
    console.log(output);
}