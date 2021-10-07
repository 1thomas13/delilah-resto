
CREATE DATABASE delilah_resto;

CREATE TABLE Users(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100),username VARCHAR (100),password VARCHAR (100), email VARCHAR(100),isadmin TINYINT(1),address VARCHAR(100),islogged TINYINT(1));

CREATE TABLE Products(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100),price INT (50),available TINYINT(1));

CREATE TABLE paymentmethod(id INT AUTO_INCREMENT PRIMARY KEY,paymentmethod INT (50));

CREATE TABLE orders(id INT AUTO_INCREMENT PRIMARY KEY,user_id INT (255),paymentmethod_id INT (50),status_id INT(50),address VARCHAR(100),date Date)

CREATE TABLE order_product(id INT AUTO_INCREMENT PRIMARY KEY,product_id INT(100),order_id INT(255));

CREATE TABLE status(id INT AUTO_INCREMENT PRIMARY KEY,status VARCHAR (100));

SELECT * FROM bandasmusicales;
SELECT pais FROM bandasmusicales WHERE pais = "argentina";
SELECT * FROM bandasmusicales WHERE integrantes = 1;
SELECT * FROM canciones WHERE year(fecha_publicacion) > 2015;
SELECT * FROM canciones WHERE duracion > 180;
SELECT * FROM albumes;