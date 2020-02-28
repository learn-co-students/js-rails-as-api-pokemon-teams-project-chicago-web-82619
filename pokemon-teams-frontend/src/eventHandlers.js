let allCards = []
const mainArea = document.querySelector('main')

// handleAddPokemon

function handleAddPokemon(target) {
  // console.log(target.dataset.trainerId)
  const trainerId = target.dataset.trainerId

  const reqObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( {
      trainer_id: trainerId
    })
  }
  fetch('http://localhost:3000/pokemons', reqObj)
    .then(resp => resp.json())
    .then(pokeData => handleTrainerNewPokemon(pokeData))
}

function handleTrainerNewPokemon(pokeData) {
  const trainerId = pokeData.trainer_id
  // console.log(pokeData)
  const trainerUl = document.querySelector(`ul[data-id="${trainerId}"]`);
  fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(resp => resp.json())
    .then(trainerData => {
      trainerUl.innerHTML =""
      const newPokemons = mapPokemons(trainerData.pokemons)
      trainerUl.innerHTML = newPokemons ? newPokemons : `<p>reached limit</p>`
    })
    .catch(error => console.log(error))
  // console.log(trainerUl)
}

// handleRemovePokemon

function handleRemovePokemon(target) {
  const reqObj = {
    method: 'DELETE'
  }
  const pokeId = target.dataset.pokemonId
  console.log(target.parentNode)
  fetch(`http://localhost:3000/pokemons/${pokeId}`, reqObj)
    .then(resp => resp.json() )
    .then(data => {
      console.log('deleted', data)
      // console.log(target)
      target.parentNode.remove()
    })

}


// handleTrainers

function getTrainerCards() {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainersData => {
      allCards = trainersData
      // console.log(allCards)
      mainArea.innerHTML = handleTrainers(allCards)
    })
}

function handleTrainers(allCards) {
  // console.log(allCards[0].pokemons)
  return allCards.map(trainerCard).join('')
}

// put the whole card together

function trainerCard(trainer) {
  // console.log(trainer)
  let front = renderTrainer(trainer);

  // run a fetch right here for the trainer's pokemons?

  let middle = mapPokemons(trainer.pokemons)
  // trainer.pokemons.map(renderTrainersPokemon).join('');



  let end = renderTrainerEnd();
  const newCard = front.concat(middle, end)
  return newCard
  console.log(newCard)


}

function mapPokemons(pokemons) {
  return pokemons.map(renderTrainersPokemon).join('');
}

function renderTrainer(trainer) {
  return (`
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul data-id="${trainer.id}">
    `)
}

// render one pokemon in an li (middle)

function renderTrainersPokemon(pokemon) {
  const pokemonLI = new Pokemon(pokemon)
  return pokemonLI.render()
  // console.log(pokemonLI.render())
}

function renderTrainerEnd() {
  return (`
      </ul>
    </div>
    `)
}
