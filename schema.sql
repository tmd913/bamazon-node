-- DROP DATABASE IF EXISTS bamazon_db;

-- CREATE DATABASE bamazon_db;

USE bamazon_db;

-- DROP TABLE products;
CREATE TABLE products (
    item_id INTEGER(5) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    product_sales DECIMAL(10, 2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

-- DROP TABLE departments;
CREATE TABLE departments (
    department_id INTEGER(5) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("Macbook Pro", "Electronics, Computers & Office", 1500, 100),
    ("Powerbeats 2", "Movies, Music & Games", 100, 50),
    ("Game of Thrones", "Books & Audible", 10, 1000),
    ("Dog Bowl", "Pet Supplies", 5, 2000),
    ("Shampoo", "Beauty & Health", 5, 5000),
    ("Football", "Sports & Outdoors", 30, 500),
    ("Diamond Necklace", "Clothing, Shoes & Jewelry", 500, 20),
    ("Shovel", "Home, Garden & Tools", 15, 1500),
    ("Granola Bar", "Restaurants, Food & Grocery", 2, 200),
    ("Hulk Hands", "Toys, Kids & Baby", 20, 10);
    
INSERT INTO departments (department_name, over_head_costs)
VALUES 
    ("Electronics, Computers & Office", 5000),
    ("Movies, Music & Games", 1000),
    ("Books & Audible", 2000),
    ("Pet Supplies", 500),
    ("Beauty & Health", 800),
    ("Sports & Outdoors", 1500),
    ("Clothing, Shoes & Jewelry", 2500),
    ("Home, Garden & Tools", 1200),
    ("Restaurants, Food & Grocery", 3000),
    ("Toys, Kids & Baby", 600);
    
SELECT * FROM products;
SELECT * FROM departments;