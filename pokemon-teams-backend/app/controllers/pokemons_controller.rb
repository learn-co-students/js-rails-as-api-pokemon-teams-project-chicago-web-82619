class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons, only: [:id, :species, :nickname, :trainer_id]
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemons.count < 6
      pokemon = Pokemon.new(
        nickname: Faker::Name.first_name,
        species: Faker::Games::Pokemon.name,
        trainer_id: params[:trainer_id],
      )
      pokemon.save
      render json: pokemon, except: [:created_at, :updated_at]
    else
      render json: { message: 'too many pokemon on team' }
    end

  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon
  end
end
