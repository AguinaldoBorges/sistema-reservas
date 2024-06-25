-- banco de dados
CREATE DATABASE reservas;

-- tabela
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    reservation_date TIMESTAMP NOT NULL,
    number_of_guests INTEGER NOT NULL,
    notes TEXT
);
