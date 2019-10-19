const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    allCharacters: [Character]
    characters(ids: [ID]): [Character]
    character(id: ID!): Character
  }
  type Character {
    id: ID!
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Origin
  }
  type Origin {
    name: String
    url: String
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
  type Mutation {
    # if false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token
  }
  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;
