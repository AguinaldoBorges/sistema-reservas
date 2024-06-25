const pool = require('../config/database');

exports.createReservation = async (req, res) => {
    const { customerName, reservationDate, numberOfGuests, notes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO reservations (customer_name, reservation_date, number_of_guests, notes) VALUES ($1, $2, $3, $4) RETURNING *',
            [customerName, reservationDate, numberOfGuests, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservations');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Reserva não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    const { customerName, reservationDate, numberOfGuests, notes } = req.body;
    try {
        const result = await pool.query(
            'UPDATE reservations SET customer_name = $1, reservation_date = $2, number_of_guests = $3, notes = $4 WHERE id = $5 RETURNING *',
            [customerName, reservationDate, numberOfGuests, notes, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Reserva não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Reserva não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
