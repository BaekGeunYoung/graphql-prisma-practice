require('dotenv').config();

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Link from "./resolvers/Link";
import User from "./resolvers/User";

const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');


const resolvers = {
    Query,
    Mutation,
    Link,
    User
};

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => {
        return {
            ...req,
            prisma
        }
    },
});

server.start(() => console.log(`server is running on http://localhost:4000`))