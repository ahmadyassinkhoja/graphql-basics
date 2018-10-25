const Query = {
    users(parent, args, { db }){
        if(!args.query){
            return db.users
        }

        return db.users.filter( (user) => {
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
    posts(parent,args, { db }){
        if(!args.query){
            return db.posts
        }

        return db.posts.filter( (post) => {
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
    comments(parent, args, { db }){
     if(!args.query){
         return db.comments
     }
     return db.comments.filter( (comment) => {
         return comment.text.toLowerCase().includes(args.query.toLowerCase())
     })
    }
  }

  export default Query;