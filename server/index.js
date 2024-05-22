import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";

const port = process.env.port || 5000 

dotenv.config()

const app = express()

//* graphql route 
app.use("/graphql" , graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == 'development'
}))

app.listen(port ,()=>{
    console.log(`Server is runnig on ${port} port`)
})