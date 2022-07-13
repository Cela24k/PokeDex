import '../scss/_single-pokemon.scss';
import React, { useState, useEffect } from 'react';

export function SinglePokemon(props) {

    return (
        <div className='col-6'>
            <div className="pokemon-card">
                <h3>{props.name}</h3>
            </div>
        </div>
    );
}

