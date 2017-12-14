import express from 'express';

const router = express.Router();

import './db'; // eslint-disable-line

router.get('/countries', require('./endpoints/countries').default);
router.get('/countries/:iso2Code', require('./endpoints/country').default);
router.get('/indicators', require('./endpoints/indicators').default);
router.get('/indicators/search', require('./endpoints/searchIndicators').default);
router.get('/indicators/:indicatorId', require('./endpoints/indicator').default);
router.get('/indicators/:indicatorId/country/:iso2Code', require('./endpoints/indicatorByCountryData').default);
router.get('/indicators/:indicatorId/year/:year', require('./endpoints/indicatorDataByYear').default);
router.get('/load-all-indicators', require('./endpoints/loadAllIndicators').default);

export default router;
