const { createTestClient } = require("apollo-server-testing");
const gql = require("graphql-tag");
const nock = require("nock");

const typeDefs = require("../schema");
const resolvers = require("../resolvers");
const CharacterAPI = require("../datasources/characters");

const { ApolloServer } = require("apollo-server");

const { mockAllCharactersResponse } = require("./mock_responses/allCharacters");

const GET_ALL_CHARACTERS = gql`
  query {
    allCharacters {
      id
      name
      status
      species
      gender
      origin {
        name
        url
      }
    }
  }
`;

const constructTestServer = () => {
  const characterAPI = new CharacterAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ characterAPI })
  });

  return { server, characterAPI };
};

describe("Queries", () => {
  it.only("fetches all characters", async () => {
    const { server, characterAPI } = constructTestServer();

    characterAPI.get = jest.fn(() => mockAllCharactersResponse);

    const { query } = createTestClient(server);
    const res = await query({ query: GET_ALL_CHARACTERS });
    expect(res.data).toEqual(expectedGraphQL.data);
  });
});

const expectedGraphQL = {
  http: { headers: {} },
  data: {
    allCharacters: [
      {
        id: "1",
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1"
        }
      },
      {
        id: "2",
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1"
        }
      },
      {
        id: "3",
        name: "Summer Smith",
        status: "Alive",
        species: "Human",
        gender: "Female",
        origin: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        }
      },
      {
        id: "4",
        name: "Beth Smith",
        status: "Alive",
        species: "Human",
        gender: "Female",
        origin: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        }
      },
      {
        id: "5",
        name: "Jerry Smith",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        }
      },
      {
        id: "6",
        name: "Abadango Cluster Princess",
        status: "Alive",
        species: "Alien",
        gender: "Female",
        origin: {
          name: "Abadango",
          url: "https://rickandmortyapi.com/api/location/2"
        }
      },
      {
        id: "7",
        name: "Abradolf Lincler",
        status: "unknown",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        }
      },
      {
        id: "8",
        name: "Adjudicator Rick",
        status: "Dead",
        species: "Human",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "9",
        name: "Agency Director",
        status: "Dead",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        }
      },
      {
        id: "10",
        name: "Alan Rails",
        status: "Dead",
        species: "Human",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "11",
        name: "Albert Einstein",
        status: "Dead",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1"
        }
      },
      {
        id: "12",
        name: "Alexander",
        status: "Dead",
        species: "Human",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1"
        }
      },
      {
        id: "13",
        name: "Alien Googah",
        status: "unknown",
        species: "Alien",
        gender: "unknown",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "14",
        name: "Alien Morty",
        status: "unknown",
        species: "Alien",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "15",
        name: "Alien Rick",
        status: "unknown",
        species: "Alien",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "16",
        name: "Amish Cyborg",
        status: "Dead",
        species: "Alien",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "17",
        name: "Annie",
        status: "Alive",
        species: "Human",
        gender: "Female",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1"
        }
      },
      {
        id: "18",
        name: "Antenna Morty",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "19",
        name: "Antenna Rick",
        status: "unknown",
        species: "Human",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      },
      {
        id: "20",
        name: "Ants in my Eyes Johnson",
        status: "unknown",
        species: "Human",
        gender: "Male",
        origin: { name: "unknown", url: "" }
      }
    ]
  }
};
