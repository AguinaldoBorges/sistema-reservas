const request = require('supertest');
const moment = require('moment');
const app = require('../../app');
const pool = require('../config/database');

beforeAll(async () => {
    await pool.query('DELETE FROM reservations');
});

describe('API de Reservas', () => {
    it('deve criar uma nova reserva', async () => {
        const res = await request(app)
            .post('/api/reservas')
            .send({
                customerName: 'Aguinaldo Borges',
                reservationDate: moment.utc().format(), // Usando o momento atual em UTC
                numberOfGuests: 4,
                notes: 'Mesa perto da janela, por favor'
            });
        console.log('Create response body:', res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('deve buscar todas as reservas', async () => {
        const res = await request(app).get('/api/reservas');
        console.log('Get all response body:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('deve buscar uma reserva pelo ID', async () => {
        const resCreate = await request(app)
            .post('/api/reservas')
            .send({
                customerName: 'Jane Doe',
                reservationDate: moment.utc().format(), // Usando o momento atual em UTC
                numberOfGuests: 2,
                notes: 'Mesa no meio'
            });

        console.log('Get by ID create response body:', resCreate.body);

        const res = await request(app).get(`/api/reservas/${resCreate.body.id}`);
        console.log('Get by ID response body:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(resCreate.body.id);
    });

    it('deve atualizar uma reserva', async () => {
        const reservationDate = moment.utc().format(); // Usando o momento atual em UTC

        const resCreate = await request(app)
            .post('/api/reservas')
            .send({
                customerName: 'John Smith',
                reservationDate: reservationDate,
                numberOfGuests: 3,
                notes: 'Mesa no canto'
            });

        console.log('Update create response body:', resCreate.body);

        const res = await request(app)
            .put(`/api/reservas/${resCreate.body.id}`)
            .send({
                customerName: 'Aguinaldo Borges Updated',
                reservationDate: reservationDate,
                numberOfGuests: 3,
                notes: 'Mesa no canto'
            });

        console.log('Update response body:', res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('customer_name', 'Aguinaldo Borges atualizado');

        // Comparando datas normalizadas para UTC
        const receivedDate = moment.utc(res.body.reservation_date).format('YYYY-MM-DD:mm:ss');
        const expectedDate = moment.utc(reservationDate).format('YYYY-MM-DD:mm:ss');

        expect(receivedDate).toEqual(expectedDate);
        expect(res.body).toHaveProperty('number_of_guests', 3);
        expect(res.body).toHaveProperty('notes', 'Mesa no canto');
    });

    it('deve deletar uma reserva', async () => {
        const resCreate = await request(app)
            .post('/api/reservas')
            .send({
                customerName: 'Aguinaldo Borges',
                reservationDate: moment.utc().format(), // Usando o momento atual em UTC
                numberOfGuests: 1,
                notes: 'Mesa perto da entrada'
            });

        const res = await request(app).delete(`/api/reservas/${resCreate.body.id}`);
        expect(res.statusCode).toEqual(204);
    });
});
