import { GraphQLServer } from 'graphql-yoga'

// Type Definitions (schema)
const typeDefs = `
    type Query {
        add(a: Float, b: Float): Float!
        greeting(name: String): String!
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String
        published: Boolean
    }
`
// Resolvers
const resolvers = {
    Query: {
        add(parent, args){
            return args.a + args.b
        },
        greeting(parent,args,ctx,info){
            if(args.name){
                return `Hello + ${args.name}`
            }else{
                return 'Hello User'
            }
        },
       id(){
        return 'abc123'
       },
       name(){
        return 'Ahmad Khoja'
       },
       age(){
        return 27
       },
       employed(){
        return true
       },
       gpa(){
        return null
       },
       me(){
           return {
               id: 'abc123',
               name: 'Ahmad Khoja',
               email: 'ahmad@Ciatek.net',
               age: null
           }
       },
       post(){
           return {
            id: 'post123',
            title: 'First Post',
            body: null,
            published: null
           }
       }
     }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=> {
    console.log('The server is up!')
})