import './db'; // eslint-disable-line
import bodyParser from 'body-parser';
import express from 'express';
import {graphql, graphiql} from './endpoints/graphql';

const router = express.Router();

router.use('/graphql', bodyParser.json(), graphql);

if (process.env.NODE_ENV === 'development') {
	router.use('/graphiql', graphiql);
}

export default router;
