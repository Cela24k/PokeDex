import '../scss/_main.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SinglePokemon } from './SinglePokemon';

var next = 'https://pokeapi.co/api/v2/pokemon';

export function Main() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        async function loadPoke() {return await populateList()};
        setLoading(true);

        loadPoke().then((e)=>{
            setPokemonList(e);
            setLoading(false);
            console.log(e);
        }).catch((e)=> {
            setLoading(false);
            console.log('Error '+e)
        });
    }, []);

    return !loading?(
        <main className="container">
            <h1>Er Pokédex</h1>
            <SinglePokemon name="Niggamon"/>
            {pokemonList.map((e,idx)=><SinglePokemon name={e.name} key={idx} />)}
        </main>
    ):(
        <div>Caricamento...</div>)
}

async function populateList() {
    let list = [];
    axios.get(next)
        .then((res) => {
            next = res.data.next;
            res.data.results.map((e) => {

                return axios.get(e.url)
                    .then((res) => {
                        list[res.data.id] = res.data;
                    })
                    .catch((e)=>{console.log('error '+e+' while loading a pokemon')})
            })
        })
        .catch((e)=>{console.log('error '+e+' while loading the list')})
    return list;
}