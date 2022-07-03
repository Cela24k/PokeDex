import '../scss/_main.scss';
import { SinglePokemon } from './SinglePokemon'
import React, { useState, useEffect } from 'react';

export function Main(){
    return (
        <main className="container">
            <h1>Er Pokédex</h1>
            <SinglePokemon />
        </main>
    );
}