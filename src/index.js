import {GraphQLServer} from 'graphql-yoga'

//type definitions (schema)
const typeDefs = `
  type Query {
   greeting(name: String, position: String): String!
   sum(firstNumber: Int!, secondNumber: Int!): Int!
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
    body: String!
    published: Boolean!
  }
`
// Scalar types - String, Boolean, int, Flot, ID
//resolvers
const resolvers = {
  Query: {
    sum(parent, args, ctx, info){
      if(args.firstNumber && args. secondNumber) {
        return args.firstNumber + args. secondNumber
      }
      return 0
    },
    greeting(parent, args, ctx, info) {
      console.log(args)
      if(args.name && args.position){return `Hello ${args.name} voce é ${args.position}`}
      return 'name'
    },
    me(){
      return {
        id: '123',
        name: 'Renan',
        email: 'renanc433@gmail.com',
      }
    },
    post () {
      return {
        id: '1234',
        title: 'Graphql like a boss',
        body: 'topzera da balada esse graphql hein bixo',
        published: true
      }
    }

  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('the server is up!')
})