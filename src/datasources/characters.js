const { RESTDataSource } = require("apollo-datasource-rest");

class CharacterAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://rickandmortyapi.com/api/";
  }
  async getAllCharacters() {
    const response = await this.get("character");

    return response.results
      ? response.results.map(character => this.characterReducer(character))
      : [];
  }

  characterReducer({ id, name, origin }) {
    return {
      id,
      name,
      origin: {
        name: origin.name,
        url: origin.url
      }
    };
  }
}

module.exports = CharacterAPI;
