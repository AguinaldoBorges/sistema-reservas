const express = require('express');
const reservationController = require('../controlers/reservationController');
const router = express.Router();


router.post('/reservas', reservationController.createReservation);
router.get('/reservas', reservationController.getReservations);
router.get('/reservas/:id', reservationController.getReservationById);
router.put('/reservas/:id', reservationController.updateReservation);
router.delete('/reservas/:id', reservationController.deleteReservation);

module.exports = router;
