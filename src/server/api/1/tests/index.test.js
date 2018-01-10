/* eslint-disable */
import router from '../index';
import request from 'supertest';
import express from 'express';

jest.mock('../db', () => ({}));
jest.mock('server/dataSource');
import dataSource from 'server/dataSource';
jest.mock('server/api/1/models/Indicator');

const app = express();
app.use('/', router);

test('Responds to /countries endpoint', async () => {
	const response = await request(app).get('/countries');
	expect(response.statusCode).toBe(200);
	expect(response.body).toBe('COUNTRIES');
});

test('Responds to /countries/:iso2Code endpoint', async () => {
	const response = await request(app).get('/countries/AA');
	expect(response.statusCode).toBe(200);
	expect(response.body).toBe('COUNTRY');
});

test('Responds to /indicators endpoint', async () => {
	const response = await request(app).get('/indicators');
	expect(response.statusCode).toBe(200);
	expect(response.body).toBe('INDICATORS');
});

test('Responds to /indicators/search endpoint', async () => {
	const response = await request(app).get('/indicators/search?pattern=xxx');
	expect(response.statusCode).toBe(200);
	expect(response.body).toEqual(dataSource.searchIndicatorsPayload);
});

test('Responds to /indicators/:indicatorId endpoint', async () => {
	const response = await request(app).get('/indicators/1');
	expect(response.statusCode).toBe(200);
	expect(response.body).toBe('INDICATOR');
});

test('Responds to /indicators/:indicatorId/country/:iso2Code endpoint', async () => {
	const response = await request(app).get('/indicators/1/country/AA');
	expect(response.statusCode).toBe(200);
	expect(response.body).toBe('INDICATOR BY COUNTRY DATA');
});

test('Responds to /indicators/:indicatorId/year/:year endpoint', async () => {
	const response = await request(app).get('/indicators/1/year/1900');
	expect(response.statusCode).toBe(200);
	expect(response.body).toBe('INDICATOR DATA BY YEAR');
});

// test('Responds to /load-all-indicators', async () => {
// 	const url = '/load-all-indicators?token=' + encodeURIComponent(process.env.SECURITY_TOKEN);
// 	const response = await request(app).get(url);
// 	expect(response.statusCode).toBe(200);
// 	expect(response.body).toEqual({inserted: 3});
// });
