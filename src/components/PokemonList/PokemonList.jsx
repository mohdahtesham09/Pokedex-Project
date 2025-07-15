import { useEffect, useState } from "react"
import axios from "axios"
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon"
function PokemonList(){

    // const [pokemonList, setPokemonList] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    // const [pokedex_url, setPokedex_url ] = useState ('https://pokeapi.co/api/v2/pokemon/') 

    // const [nextUrl, setNextUrl] = useState('')
    // const [prevUrl, setPrevUrl] = useState('')

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedex_url: 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl: '',
        prevUrl: ''

    })

     async function downloadPokemon(){
        // setIsLoading(true)
        setPokemonListState({...pokemonListState, isLoading: true});
         const response = await axios.get(pokemonListState.pokedex_url) // this downloads list of 20 pokemon

         const PokemonResult = response.data.results; // we get arry of pokemons on result

         console.log(response.data)
         setPokemonListState((State) => ({ 
            ...State, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }))
    
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
         setPokemonListState((State) => ({
            ...State ,
            pokemonList: pokeListResult, 
            isLoading: false
        }))
        
     }

    useEffect(() => {
       downloadPokemon()
    },[pokemonListState.pokedex_url])

   


    return (
        <>
        <div className="pokemon-list-wrapper">
            <div className="heading-List">Pokemon List</div>

            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading...' : 
                pokemonListState.pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} key = {p.id} id = {p.id} />)
                }
            </div>
            <div className="controls">
                <button disabled = {pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedex_url: pokemonListState.prevUrl})}>Prev</button>
                <button disabled = {pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedex_url: pokemonListState.nextUrl})}>Next</button>
            </div>
        </div>
        </>
    )

}
export default PokemonList