-- CREATE DATABASE --

DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- CREATE TABLE CALLED PRODUCTS W/ THE FOLLOWING: --
-- item_id, product_name, department_name, price, and stock_quantity --

CREATE TABLE products(

    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(11),
    PRIMARY KEY (item_id)
);

-- TAKE 10 MOCK PRODUCTS AND INSERT THEM INTO THE NEW TABLE -- 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Life is F*cked", "Books", 16.99, 56),
("Avocuddle Plushie", "Toys", 15.99, 124),
("Wok", "Kitchen", 25.99, 85),
("Cajon", "Musical Instruments", 83.49, 93),
("Sigma Makeup Brush Set", "Beauty", 73.98, 49),
("Drone with Camera", "Toys", 93.99, 22),
("Electric Fan", "Home", 12.39, 70),
("Vinyl Record Player", "Electronics", 239.99, 47),
("Fedora", "Fashion", 60.26, 13),
("Paper Shredder", "Office", 36.99, 300);