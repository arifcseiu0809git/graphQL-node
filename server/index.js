const express=require('express');
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware}=require("@apollo/server/express4");

const bodyParser=require("body-parser");
const cors=require("cors");
const { default: axios } = require('axios');

const {USERS} =require("./user");
const {TODOS} =require("./todo");

async function startServer(){
    const app=express();
    const server = new ApolloServer({
        typeDefs:`
            type Todo{
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }

            type User{
                id: ID!
                name: String!
                username: String!
                phone: String!
            }

            type Query{
                GetTodos: [Todo]
                GetUsers: [User]
                GetUser(id: ID!): User
            }
        `,
        resolvers:{
            // Todo:{
            //     user:  async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
            // },
            Todo:{
                user: (todo) => USERS.find((e)=>e.id===todo.id) ,
            },
            Query:{
                // GetTodos: async ()=> (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                GetTodos: ()=> TODOS,
                //GetUsers: async ()=> (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                GetUsers: ()=> USERS,
                // GetUser:  async (parent,{id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
                GetUser:  async (parent,{id}) => USERS.find((e)=>e.id===id) ,
            }
        },
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql",expressMiddleware(server));

    app.listen(8000,()=>console.log("Server Started a PORT 8000"));
    
}

startServer();