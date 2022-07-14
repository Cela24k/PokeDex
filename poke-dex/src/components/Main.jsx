import '../scss/_main.scss';
import axios from 'axios';
import { SinglePokemon } from './SinglePokemon'
import React, { useState, useEffect } from 'react';

export function Main(){

    const [pokemonList, setPokemonList] = useState([]);
    const url = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                const responsePokemon = res.data.results;
                setPokemonList(responsePokemon);
                url = res.data.next;
        });
    }, []);
    
    return (
        <main className="container">
            <h1>Er Pokédex</h1>
            <div className='row mt-4'>
            {
                pokemonList.map((pokemon) => {
                    console.log(pokemon);
                    return (
                        <SinglePokemon key={pokemon.id} name={pokemon.name} />
                    )
                })
            }
            </div>
        </main>
    );
}