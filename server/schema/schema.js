import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
// import { clients, projects } from "./sampleData.js";
import Client from "../models/clients.js";
import Projects from "../models/project.js"


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
         return Client.findById(parent.clientId)
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
        return Projects.findById(args.id)
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => {
        return Projects.find();
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Client.findById(args.id)
      },
    },
  },
});


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phoneNumber: args.phoneNumber
        });

        try {
          return await client.save();
        } catch (error) {
          throw new Error('Error adding client: ' + error.message);
        }
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation
});
