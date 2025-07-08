CREATE DATABASE marlyhandmade;

USE marlyhandmade;

CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `user` VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO login (`user`, name, lastname, password)
VALUES ('Admin', 'Maryen', 'Aguilar', 'Maryen');
