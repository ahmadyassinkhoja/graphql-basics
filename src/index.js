import { GraphQLServer } from 'graphql-yoga'

const users = [
    {
        id: '1',
        name: 'Ahmad Khoja',
        email: 'ahmadK@Ciatek.net',
        age: null,
        posts: '1',
        comments: '1'
    },
    {
        id: '2',
        name: 'Mohi',
        email: 'ahmadT@Ciatek.net',
        age: 22,
        posts: '2',
        comments:'2'
    }
]
const posts = [
    {
        id: 'post1',
        title: 'First Post',
        body: 'Potato is sweet',
        published: false,
        author: '1',
        comments: 'post1'
    },
    {
        id: 'post2',
        title: 'Second Post',
        body: 'Batata is sweet',
        published: true,
        author: '2',
        comments: 'post2'
    }
]

const comments = [
    {
        id: '1',
        text: 'Thanks Teacher',
        author: '1',
        post:'post1'
    },
    {
        id: '2',
        text: 'Awesome Course',
        author: '1',
        post:'post1'
    },
    {
        id: '3',
        text: 'The teacher talks alot',
        author: '2',
        post:'post2'

    }
]

// Type Definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String
        published: Boolean
        author: User!
        comments: [Comment]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
// Resolvers
const resolvers = {
    Query: {
       users(parent, args){
           if(!args.query){
               return users
           }

           return users.filter( (user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
           })
       },
       me(){
           return {
               id: 'abc123',
               name: 'Ahmad Khoja',
               email: 'ahmad@Ciatek.net',
               age: null
           }
       },
       posts(parent,args){
           if(!args.query){
               return posts
           }

           return posts.filter( (post) => {
               const isTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
               const isBody = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitle || isBody
           })
        },
       post(){
           return {
            id: 'post123',
            title: 'First Post',
            body: null,
            published: null
           }
       },
       comments(parent, args){
        if(!args.query){
            return comments
        }
        return comments.filter( (comment) => {
            return comment.text.toLowerCase().includes(args.query.toLowerCase())
        })
       }
     },
     Post:{
         author(parent,args,ctx,info){
            return users.find( (user) => {
                return user.id === parent.author
            }) 
         },
         comments(parent){
            return comments.filter( (comment) => {
                return comment.post === parent.id
            }) 
         }
     },
     User: {
         posts(parent,args,ctx,info){
            return posts.filter( (post) => {
                return post.author == parent.id
            })
         },
         comments(parent){
            return comments.filter( (comment) => {
                return comment.author == parent.id
            })
         }
     },
     Comment: {
         author(parent){
            return users.find( (user) => {
                return user.id == parent.author
            })
         },
         post(parent){
            return posts.find( (post) => {
                return post.id == parent.post
            })
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