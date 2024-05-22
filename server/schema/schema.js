import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { clients, projects } from "./sampleData.js";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
        type: ClientType,
        resolve: (parent, args) => {
          return clients.find((value) => {
            return parent.clientId == value.id;
          });
        },
      },
  }),
  
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return projects.find((value) => {
          return args.id == value.id;
        });
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => {
        return projects;
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return clients.find((clientObj) => {
          return clientObj.id === args.id;
        });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
