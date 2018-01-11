import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import dataSource from 'server/dataSource';
import GraphQLJSON from 'graphql-type-json'; // eslint-disable-line

const typeDefs = `
  scalar JSON

  type Query {
  	countries: [Country],
  	country(iso2Code: String!): Country,
  	indicators: [Indicator],
  	indicator(id: String!): Indicator,
  	indicatorDataByYear(indicatorId: String!, year: Int!): [IndicatorValue],
  	indicatorDataByCountry(indicatorId: String!, iso2Code: String!): [IndicatorValue], 
  }
  
  type Country {
    id: String,
    iso2Code: String,
    name: String,
    region: JSON,
    adminregion: JSON,
    incomeLevel: JSON,
    lendingType: JSON,
    capitalCity: String,
    longitude: String,
    latitude: String
  }
  
  type Indicator {
    id: String,
    name: String,
	topics: JSON,
    sourceOrganization: String,
    sourceNote: String,
    source: JSON,
    unit: String
  }
  
  type IndicatorValue {
	name: String,
	date: String,
	value: Float
  }
`;

const resolvers = {
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
