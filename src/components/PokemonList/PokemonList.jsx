import { useEffect, useState } from "react"
import axios from "axios"
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon"
function PokemonList(){

    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon/' 

     async function downloadPokemon(){
         const response = await axios.get(POKEDEX_URL) // this downloads list of 20 pokemon

         const PokemonResult = response.data.results; // we get arry of pokemons on result

         console.log(response.data)

         // iterating over the array of pokemon, and using there url, to create a an array of promice 
         // that will download those 20 pokemon  
         const PokemonResultPromise = PokemonResult.map((Pokemon) => axios.get(Pokemon.url))
         
         // Passing that promioce array to axios.all
         const pokemonData = await axios.all(PokemonResultPromise); // array of 20 pokemon detailed data
         console.log(pokemonData)

         // now iterate on the data of each pokemon, and extract id, name image types
         const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon?.sprites?.other?.dream_world?.front_default || pokemon?.sprites?.other?.['official-artwork']?.front_default ||pokemon?.sprites?.front_default ||'',

                types: pokemon.types
            }
         });
         console.log(pokeListResult)
         setPokemonList(pokeListResult)
        setIsLoading(false)
     }

    useEffect(() => {
       downloadPokemon()
    },[])

   


    return (
        <>
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
        {(isLoading) ? 'Loading...' : 
        pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} key = {p.id}/>)
        }
        </div>
        </>
    )

}
export default PokemonList