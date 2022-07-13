import '../scss/_main.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SinglePokemon } from './SinglePokemon';

var next = 'https://pokeapi.co/api/v2/pokemon';

export function Main() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        async function loadPoke() {return await populateList()};
        loadPoke().then((e)=>{
            setPokemonList(e) 
            setLoaded(true);
            console.log(e);
        }).catch((e)=> console.log('Error '+e));
    }, []);
    return loaded?(
        <main className="container">
            <h1>Er Pokédex</h1>
            <SinglePokemon name="Niggamon"/>
            {/*pokemonList.map((e) => {console.log('pls')})*/}
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
                axios.get(e.url)
                    .then((res) => {
                        list[res.data.id] = res.data;
                    })
                    .catch((e)=>{console.log('error '+e+' while loading a pokemon')})
            })
        })
        .catch((e)=>{console.log('error '+e+' while loading the list')})
    return list;
}