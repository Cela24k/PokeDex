import '../scss/_single-pokemon.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export function SinglePokemon(){
    
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
            .then((res) => {
                const responsePokemon = res.data.results;
                setPokemonList(responsePokemon);
        });
    }, []);
    
    return (
        <div className='row mt-4'>
            {
                pokemonList.map((pokemon) => {
                    const { name } = pokemon;
                    return (
                        <div className='col-6'>
                            <div key={name} className="pokemon-card">
                                <h3>{name}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </div>  
    );
}