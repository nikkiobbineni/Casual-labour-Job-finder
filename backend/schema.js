const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID
    fname: String!
    lname: String
    username: String!
    email: String!
    password: String!
  }

  type Jobs {
    id: ID
    title: String
    poc: String
    description: String
    phonenumber: String
    email: String
    wages: String
    vacancies: String
    startdate: String
    enddate: String
    area: String
    location: String
    tags: [String]
    username:String
    createdAt : String
  }
  type Responses {
    id: ID
    date: String
    name: String
    previoushires: String
    status: String
    phonenumber:String
    jobid : String
    username : String
    createdAt:String
  }
  type JobsLocation{
    id: ID
    title: String
    poc: String
    description: String
    phonenumber: String
    email: String
    wages: String
    vacancies: String
    startdate: String
    enddate: String
    area: String
    location: String
    tags: [String]
    username:String
    createdAt : String
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
    job(id: ID!): Jobs
    jobs: [Jobs!]!
    response(id: ID!): Responses
    responses: [Responses!]!
    jobsByLocationAndTag(location: String!, tag: String!): [Jobs!]!
    jobslocation: [Jobs!]!
  }
  

  input UserInput {
    fname: String
    id:String
    lname: String
    username: String
    email: String
    password: String
  }

  input JobsInput {
    title: String
    poc: String
    description: String
    phonenumber: String
    email: String
    wages: String
    vacancies: String
    startdate: String
    enddate: String
    area: String
    location: String
    tags: [String]
    username:String
    id:String
    createdAt:String
  }
  input ResponsesInput {
    id: ID
    date: String
    name: String
    previoushires: String
    status: String
    phonenumber:String
    jobid : String
    username : String
    createdAt:String
  }

  type Mutation {
    createUser(input: UserInput): User
    deleteUser(input: UserInput): User
    checkCredentials(input: UserInput): User
    createJobPartOne(input: JobsInput): Jobs
    createJobPartTwo(input: JobsInput): Jobs
    deleteJob(input: JobsInput): Jobs
    updateJob(input: JobsInput): Jobs
    getJobDetails(input: JobsInput) : Jobs
    getProfile(input: UserInput) : User
    updateProfile(input: UserInput): User
    getJobCount(input: JobsInput) : Jobs
    getResponseCount(input: ResponsesInput) : Responses
    getJobResponses(input: ResponsesInput) : Responses
    createResponse(input: ResponsesInput) : Responses
  }
`;

module.exports = typeDefs;
