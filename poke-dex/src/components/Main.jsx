import '../scss/_main.scss';
import axios from 'axios';
import { SinglePokemon } from './SinglePokemon'
import React, { useState, useEffect } from 'react';

export function Main(){

    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const url = "https://pokeapi.co/api/v2/pokemon/";

    let lista = [];
    useEffect(() => {
        setLoading(true);
        axios.get(url)
            .then((res) => {
                let responsePokemon = res.data.results;
                setPokemonList(responsePokemon);

                
                responsePokemon.map((e) => {
                    axios.get(e.url)
                        .then((res) => {
                            lista[res.data.id] = res.data;
                            // setPokemonList(lista);
                            // console.log(lista);
                        })
                });
        }).then(() => {
            setPokemonList(lista);
            setLoading(false);
        });
    }, []);
    

    return (loading) ? <div>Caricamento...</div> : (
        <main className="container">
            <h1>Er Pokédex</h1>
            <div className='row mt-4'>
            {
                pokemonList.map((pokemon) => {
                    return (
                        <SinglePokemon key={pokemon.name} name={pokemon.name} />
                    )
                })
            }
            </div>
        </main>
    );
}