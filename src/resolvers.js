module.exports = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    allCharacters: (_, __, { dataSources }) =>
      dataSources.characterAPI.getAllCharacters(),
    character: (_, { id }, { dataSources }) =>
      dataSources.characterAPI.getCharacter({ id }),
    characters: (_, { ids }, { dataSources }) =>
      dataSources.characterAPI.getCharacters({ ids })
  }
};
