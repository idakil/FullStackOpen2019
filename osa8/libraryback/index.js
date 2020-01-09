require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => { console.log('connected to mongodb') })

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    
    type Token {
        value: String!
    }

    type Author{
        name: String
        id: ID!
        born: Int
        bookCount: Int
    }
    type Book{
        title: String!
        published: Int!
        author: Author
        genres: [String!]!
        id: ID!
    }
    type Query {
        hello: String
        allBooks(author: String, genre: String, title: String, published: Int): [Book]
        allAuthors: [Author]
        bookCount: Int
        authorCount: Int
        findAuthor(name: String!): Author
        findBook(title: String!): Book
        me: User
    }

    type Mutation {
        addBook(
          title: String!
          published: Int
          author: String
          genres: [String]
        ): Book
        editAuthor(
            name: String
            born: Int
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
          ): User
        login(
            username: String!
            password: String!
          ): Token
      }
    type Subscription{
        bookAdded: Book!
    }
`

const resolvers = {
    Author: {
        bookCount: async (root, args) => {
            const books = await Book.find({ author: root._id})
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser)
                throw new AuthenticationError("not authenticated")

            const author = await Author.findOneAndUpdate(
                { name: args.author },
                { name: args.author },
                { new: true, upsert: true }
            )

            const book = await Book.findOneAndUpdate(
                { title: args.title },
                { ...args, author: author },
                { new: true, upsert: true }
            ).populate("author")
            try {
                await author.save()
                await book.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser)
                throw new AuthenticationError("not authenticated")
            const author = await Author.findOne({ name: args.name })
            if(author === null)
                return null
            try {
                author.born = args.born
                await author.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const user = await User.findOneAndUpdate({ username: args.username },
                { username: args.username, favoriteGenre: args.favoriteGenre },
                { upsert: true, new: true })
            try {
                await user.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }
            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }
            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Query: {
        me: (root, args, context) => context.currentUser,
        allBooks: async (root, args) => {
            if (!args.genre) {
                const b = await Book.find({}).populate('author')
                return b
            }
            const book = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
            return book
        }
        ,
        allAuthors: () =>  Author.find({}),
        authorCount: () => Author.collection.countDocuments(),
        findAuthor: (root, args) =>
            authors.find(p => p.name === args.name),
        findBook: (root, args) =>
            books.find(p => p.title === args.title)
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
