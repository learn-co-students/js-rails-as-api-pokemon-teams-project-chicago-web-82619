const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function main(){
    document.addEventListener("DOMContentLoaded", () =>{
        listTrainers();
        addClickListener();
    });
}

function addClickListener(){
    document.addEventListener('click', (event) => {
        if (event.target.dataset.trainerId){
            addPokemon(event);
        }
        else if (event.target.className === "release"){
            removePokemon(event);
        }
    })
}

function addPokemon(event){
    const eventList = event.target.parentNode.children[2]
    if (eventList.childElementCount < 6){
        const reqObj = {
            method: "POST",

            headers: {
                "Content-Type": 'application/json'
            },

            body: JSON.stringify({
                trainer_id: event.target.parentNode.dataset.id
            })
        };

        fetch(POKEMONS_URL, reqObj)
        .then(resp => resp.json())
        .then(json => eventList.append(makePokemon(json)));
    }
    else {
        alert("Can't have more then 6 pokemon")
    }
}

function removePokemon(event){
    id = event.target.dataset.pokemonId
    li = event.target.parentNode
    ul = li.parentNode
    const reqObj = {
        method: "DELETE",

        headers: {
            "Content-Type": 'application/json'
        },

        body: JSON.stringify({
            trainer_id: event.target.parentNode.dataset.id
        })
    };

    fetch(`${POKEMONS_URL}/${id}`, reqObj)
    ul.removeChild(li);
}

function listTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => displayTrainers(json))
}

function displayTrainers(json){
    const main = document.querySelector('main');

    for(const trainer of json){
        main.append(makeCard(trainer));
    }
}

function makeCard(trainer){
    const div = document.createElement('div');
    div.className = "card"
    div.dataset.id = trainer.id;

    const p = document.createElement('p');
    p.innerHTML = trainer.name

    const button = document.createElement('button');
    button.dataset.trainerId = trainer.id
    button.innerHTML = "Add a Pokemon"

    div.append(p);
    div.append(button);
    div.append(pokemonList(trainer));

    return div
}

function pokemonList(trainer){
    const ul = document.createElement('ul');
    for (const pokemon of trainer['pokemons']){
        ul.append(makePokemon(pokemon));
    }
    return ul
}

function makePokemon(pokemon){
    const li = document.createElement('li');
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;

    const button = document.createElement('button');
    button.className = "release"
    button.dataset.pokemonId = pokemon.id
    button.innerHTML = "Release"

    li.append(button);

    return li;
}

main()