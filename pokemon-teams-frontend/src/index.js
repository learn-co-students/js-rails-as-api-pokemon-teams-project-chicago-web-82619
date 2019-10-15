const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main');
let trainerList = document.createElement('ul');
mainTag.append(trainerList);

document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers();
})

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => data.forEach(renderTrainer))
}

function renderTrainer(data){
    trainerCard = document.createElement('div');
    trainerCard.setAttribute('class','card');
    trainerCard.setAttribute('data-id', data.id);
    trainerName = document.createElement('p');
    trainerName.innerHTML = `${data.name}`;
    trainerCard.append(trainerName);
    let addBtn = document.createElement('button');
    addBtn.setAttribute('data-trainer-id', data.id);
    addBtn.innerHTML = "Add Pokemon";
    addBtn.addEventListener("click", e => {
        addPokemon(e.target);
    })
    trainerCard.append(addBtn)
    let pokeList = document.createElement('ul');
    trainerCard.append(pokeList);
    data.pokemons.forEach(pokemon => {
        renderPokemon(pokemon, trainerCard);
    })
    trainerList.append(trainerCard);
}

function addPokemon(target){
    fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          trainer_id: `${target.dataset.trainerId}`
        })
      })
      .then(resp => resp.json())
      .then(pokemon => renderPokemon(pokemon, document.querySelector(`[data-id="${target.dataset.trainerId}"]`)))
}

function releasePokemon(target){
    fetch(`http://localhost:3000/pokemons/${target.dataset.pokemonId}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json() )
        .then(data => {
          target.parentNode.remove()
    })
}

function renderPokemon(pokemon, trainerCard){
        let li = document.createElement('li');
        let releaseBtn = document.createElement('button');
        releaseBtn.setAttribute('class','release');
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
        releaseBtn.innerHTML = "Release Pokemon";
        releaseBtn.addEventListener("click", e => {
            releasePokemon(e.target);
        })
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
        li.insertAdjacentElement('beforeend', releaseBtn);
        trainerCard.append(li);
}