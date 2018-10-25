const Mutation = {
    createUser(parent, args, { db }, info){
        const emailTaken = db.users.some( (user) => {
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
        db.users.push(newUser)
        return newUser
    },
    deleteUser(parent,args, { db }){
        const userIndex = db.users.findIndex( (user) => user.id == args.id)
        if(userIndex<0){
            throw new Error('no user to delete')
        }

        db.posts = db.posts.filter( (post) => {
            const match = post.author == args.id
            if(match){
                db.comments = db.comments.filter( (comment) => comment.post !== post.id
                )
            } 
            return !match
        })
        db.comments = db.comments.filter( (comment) => comment.author !== args.id)

        const deletedUsers = db.users.splice(userIndex, 1)
        return deletedUsers[0]
    },
    updateUser(parent,args,{ db }, info){
        const { id,data } = args
        const user = db.users.find( (user) => user.id == id)

        if(!user){
            throw new Error('user not found')
        }
        if(typeof data.email === 'string'){
            user.email = data.email
        }
        if(typeof data.name === 'string'){
            user.name = data.name
        }
        if(typeof data.age !== 'undefined'){
            user.age = data.age
        }

        return user
    },
    createPost(parent, args, { db }){
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
        db.posts.push(newPost)
        return newPost
    },
    deletePost(parent, args, { db }){
        let postIndex = db.posts.find( (post) => post.id == args.id)

        if(postIndex < 0){
            throw new Error('post not found')
        }
        db.comments = db.comments.filter( (comment) => {
            let match = comment.post == args.id
                return !match
        })
        db.posts = db.posts.filter( (post) => post.author !== args.id)

        const deletedUsers = db.posts.splice(postIndex, 1)
        return deletedUsers[0]
    },
    updatePost(parent,{ id, data }, { db }){
        const post = db.posts.find( (post) => post.id == id)
        if(!post){
            throw new Error('post is not found')
        }
        if(typeof data.title === 'string'){
            post.title = data.title
        }
        if(typeof data.body === 'string'){
            post.body = data.body
        }
        if(typeof data.published !== null){
            post.published = data.published
        }
        if(typeof data.author !== 'undefined'){
            post.author = data.author
        }
        return post
    },
    createComment(parent, args, { db }){
        let newComment = {
            id: comment_ids++,
            text: args.text,
            author: args.author,
            post: args.post,
        }
        db.comments.push(newComment)
        return newComment
    },
    deleteComment(parent, args, { db }){
        const commentIndex = db.comments.findIndex( (comment) => comment.id == args.id)

        if(commentIndex < 0){
            throw new Error('comment not found')
        }
        const deletedComments = db.comments.splice(commentIndex, 1)
        return deletedComments[0]
    },
    updateComment(parent,{ id,text },{ db }){
        const comment = db.comments.find( (comment) => comment.id == id)
        if(comment < 0){
            throw new Error('comment not found')
        }
        if(typeof text === 'string'){
            comment.text = text
        }
        return comment
    }
}

export default Mutation;