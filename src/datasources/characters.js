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

  async getCharacter({ id }) {
    const response = await this.get(`character/${id}`);
    return response ? this.characterReducer(response) : null;
  }

  characterReducer({ id, name, status, species, type, gender, origin }) {
    return {
      id,
      name,
      status,
      species,
      type,
      gender,
      origin: {
        name: origin.name,
        url: origin.url
      }
    };
  }
}

module.exports = CharacterAPI;
