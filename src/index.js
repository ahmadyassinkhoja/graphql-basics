import { GraphQLServer } from 'graphql-yoga'

let ids = 3
let post_ids = 3
let comment_ids = 4

let users = [
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
let posts = [
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

let comments = [
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
    
    type Mutation {
        createUser(data: CreateUserInput) : User!
        deleteUser(id: ID!) : User!
        createPost(title: String!,body: String!, published: Boolean, author: ID!) : Post!
        createComment(text: String!, author: ID!, post: ID!) : Comment!
    }

    input CreateUserInput {
        name: String!, 
        email: String!, 
        age: Int
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
     },
     Mutation: {
        createUser(parent, args, ctx, info){
            const emailTaken = users.some( (user) => {
                return user.email === args.email
            })

            if(args.name == '' || args.email == '' ){
                throw new Error(' no name or no email provided')
            }
            if(emailTaken){
                throw new Error('email taken')
            }
            let newUser = {
                id: ids++,
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(newUser)
            return newUser
        },
        deleteUser(parent,args){
            const userIndex = users.findIndex( (user) => user.id == args.id)
            if(userIndex<0){
                throw new Error('no user to delete')
            }

            posts = posts.filter( (post) => {
                const match = post.author == args.id
                if(match){
                    comments = comments.filter( (comment) => comment.post !== post.id
                    )
                } 
                return !match
            })
            comments = comments.filter( (comment) => comment.author !== args.id)

            const deletedUsers = users.splice(userIndex, 1)
            return deletedUsers[0]
        },
        createPost(parent, args){
            // const userExists = users.some( (user) => user.id == args.author)
            // if(userExists){
            //     throw new Error('user exists')
            // }
            let newPost = {
                id: 'post' + post_ids++,
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }
            posts.push(newPost)
            return newPost
        },
        createComment(parent, args){
            let newComment = {
                id: comment_ids++,
                text: args.text,
                author: args.author,
                post: args.post,
            }
            comments.push(newComment)
            return newComment
        }
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=> {
    console.log('The server is up!')
})