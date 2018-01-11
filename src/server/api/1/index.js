import './db'; // eslint-disable-line
import express from 'express';
import countries from './endpoints/countries';
import country from './endpoints/country';
import indicators from './endpoints/indicators';
import searchIndicators from './endpoints/searchIndicators';
import indicator from './endpoints/indicator';
import indicatorByCountryData from './endpoints/indicatorByCountryData';
import indicatorDataByYear from './endpoints/indicatorDataByYear';
import loadAllIndicators from './endpoints/loadAllIndicators';
import {graphql, graphiql} from './endpoints/graphql';

const router = express.Router();

router.get('/countries', countries);
router.get('/countries/:iso2Code', country);
router.get('/indicators', indicators);
router.get('/indicators/search', searchIndicators);
router.get('/indicators/:indicatorId', indicator);
router.get('/indicators/:indicatorId/country/:iso2Code', indicatorByCountryData);
router.get('/indicators/:indicatorId/year/:year', indicatorDataByYear);
router.get('/load-all-indicators', loadAllIndicators);
router.use('/graphql', graphql);

if (process.env.NODE_ENV === 'development') {
	router.use('/graphiql', graphiql);
}

export default router;
