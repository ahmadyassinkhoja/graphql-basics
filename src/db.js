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

const db = {
    users,
    posts,
    comments
}

export { db as default }