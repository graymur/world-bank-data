import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import dataSource from 'server/dataSource';
import {mergeTypes, fileLoader} from 'merge-graphql-schemas';
import path from 'path';
import GraphQLJSON from 'graphql-type-json'; // eslint-disable-line

const typesArray = fileLoader(path.join(__dirname, './graphql'));
const typeDefs = `
scalar JSON

${mergeTypes(typesArray)}
`;

const resolvers = {
	JSON: GraphQLJSON,
	Query: {
		countries: () => dataSource.fetchCountries(),
		country: (_, {iso2Code}) => dataSource.fetchCountry(iso2Code),
		indicators: () => dataSource.fetchIndicators(),
		indicator: (_, {id}) => dataSource.fetchIndicator(id),
		indicatorDataByYear: (_, {indicatorId, year}) => dataSource.fetchIndicatorDataByYear(indicatorId, year),
		indicatorDataByCountry: (_, {iso2Code, indicatorId}) => dataSource.fetchIndicatorByCountryData(iso2Code, indicatorId)
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

export const graphql = graphqlExpress({schema});
export const graphiql = graphiqlExpress({endpointURL: '/api/1/graphql'});
