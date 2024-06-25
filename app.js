const express = require('express');
const reservationRoutes = require('./src/routes/reservationRoutes');
const pool = require('./src/config/database');

const app = express();

app.use(express.json());
app.use('/api', reservationRoutes);

pool.query(`
  CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    reservation_date TIMESTAMP NOT NULL,
    number_of_guests INTEGER NOT NULL,
    notes TEXT
  )
`).then(() => {
    console.log('Banco de dados sincronizado');
}).catch(err => {
    console.error('Erro ao sincronizar banco de dados', err);
});

module.exports = app;
