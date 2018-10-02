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
    connection.query(
        `SELECT * FROM products`,
        function (err, res) {
            let data = [
                ["Item ID", "Product Name", "Department Name", "Price ($)", "Stock Quantity", "Product Sales ($)"]
            ];
            res.forEach(element => {
                let row = [
                    element.item_id,
                    element.product_name,
                    element.department_name,
                    element.price,
                    element.stock_quantity,
                    element.product_sales
                ];
                data.push(row);
            });
            createTable(data);

            placeOrder();
        }
    );
});

function placeOrder() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "units",
                type: "input",
                message: "How many units of the product would you like to buy?"
            }
        ])
        .then(function (answer) {
            connection.query(
                `
                SELECT * 
                FROM products 
                WHERE item_id = ${answer.id}
                `,
                function (err, res) {
                    if (res[0].stock_quantity >= answer.units) {
                        console.log(`Total cost of purchase: $${res[0].price * answer.units}`);
                        connection.query(
                            `
                            UPDATE products
                            SET 
                                stock_quantity = ${res[0].stock_quantity - answer.units},
                                product_sales = ${res[0].price * answer.units}
                            WHERE item_id = ${answer.id}
                            `,
                            function (err, res) {
                                console.log("Order filled...")
                            }
                        );
                    } else {
                        console.log("There is an insufficient stock quantity to fill your order");
                    }

                    connection.end();
                }
            );
        });
}

function createTable(data) {
    let output = table(data);
    console.log(output);
}