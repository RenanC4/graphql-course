import {GraphQLServer} from 'graphql-yoga'
//demo data

const users = [{
  id:'1',
  name: 'Renan',
  email: 'renanc433@gmail.com',
  age: 24
},
{
  id:'2',
  name: 'Hernandes',
  email: 'hernandes@gmail.com',
  age: 1
},
{
  id:'3',
  name: 'Lorena',
  email: 'lorena@gmail.com',
  age: 1
}
]
//type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String):[User!]!
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
    users(parent, args, ctx, info){
      if(!args.query){
        return users
      }

      return users.filter(user=>{
        return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      })
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
    },

  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('the server is up!')
})