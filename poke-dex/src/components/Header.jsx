import '../scss/_header.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Header(){
    const [name,setName] = useState([]);
    
    function getPoke(){
        fetch('https://pokeapi.co/api/v2/pokemon/1/')
        .then((response)=>response.json())
        .then((data)=> setName(data.forms[0].name));
    }

    useEffect(()=>{getPoke()});
    
    return (
        <div>{name}</div>  
    );
}