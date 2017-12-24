import './db'; // eslint-disable-line
import express from 'express';
import dataSource from 'server/dataSource';
import {IndicatorModel} from 'server/api/1/models/Indicator';

const provideDS = fn => fn(dataSource);

const router = express.Router();

router.get('/countries', provideDS(require('./endpoints/countries').default));
router.get('/countries/:iso2Code', provideDS(require('./endpoints/country').default));
router.get('/indicators', provideDS(require('./endpoints/indicators').default));
router.get('/indicators/search', provideDS(require('./endpoints/searchIndicators').default));
router.get('/indicators/:indicatorId', provideDS(require('./endpoints/indicator').default));
router.get('/indicators/:indicatorId/country/:iso2Code', provideDS(require('./endpoints/indicatorByCountryData').default));
router.get('/indicators/:indicatorId/year/:year', provideDS(require('./endpoints/indicatorDataByYear').default));
router.get('/load-all-indicators', require('./endpoints/loadAllIndicators').default(dataSource, IndicatorModel));

export default router;
