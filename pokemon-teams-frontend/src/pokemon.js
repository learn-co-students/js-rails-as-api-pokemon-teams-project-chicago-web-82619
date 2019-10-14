class Pokemon {
  constructor(pokemonObj) {
    this.id = pokemonObj.id;
    this.nickname = pokemonObj.nickname;
    this.species = pokemonObj.species;
    this.trainerID = pokemonObj.trainer_id;
  }

  render() {
    return `
    <li>${this.nickname} (${this.species}) <button class="release" data-pokemon-id="${this.id}">Release</button></li>
    `;
  }
}
