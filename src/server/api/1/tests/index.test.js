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

test('Fetches indicator', async () => {
	const response = await request(app).post('/graphql').send({
		'operationName': 'indicatorQuery',
		'variables': {'id': 'NY.GDP.PCAP.CD'},
		'query': `query indicatorQuery($id: String!) {
		 	indicator(id: $id) {
		 	    id,
		 	    name
		  	}
	  	}`
	});

	expect(response.statusCode).toBe(200);
	expect(response.body.data.indicator.id).toBe('1');
	expect(response.body.data.indicator.name).toBe('INDICATOR');
});

test('Fetches country', async () => {
	const response = await request(app).post('/graphql').send({
		'operationName': 'countryQuery',
		'variables': {'iso2Code': 'LR'},
		'query': `query countryQuery($iso2Code: String!) {
	 		country(iso2Code: $iso2Code) {
		 		name
				iso2Code
		  	}
	  	}`
	});

	expect(response.statusCode).toBe(200);
	expect(response.body.data.country.iso2Code).toBe('AA');
	expect(response.body.data.country.name).toBe('COUNTRY');
});
