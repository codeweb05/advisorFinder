import express, { Application, Request, Response } from "express";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";

import { resolvers } from "./graphql/resolvers";

const typeDefs = gql`
	type Advisor {
		id: Int!
		name: String!
		language: String!
		reviews: Int!
		status: String!
	}
	type Query {
		advisors(
			offset: Int
			limit: Int
			searchValue: String
			shouldShowOnline: Boolean
			order: String
			orderBy: String
		): [Advisor!]!
	}
`;

const PORT = process.env.PORT || 4000;

const startApolloServer = async () => {
	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();

	const app: Application = express();

	server.applyMiddleware({ app });

	app.use(express.static(path.join(__dirname, "../client/build")));

	app.get("*", (req: Request, res: Response) => {
		return res.sendFile(path.join(__dirname + "../client/build/index.html"));
	});

	app.listen(PORT, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
};

startApolloServer();
