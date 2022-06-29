import { Router } from "express";
import jsonwebtoken = require('jsonwebtoken');

var router = Router();

// ENDPOINTS

// ---------------------------------- TEAM 
// GET /user/{userid}/teams                                                         ritorna i teams dell'utente
// POST /user/{userid}/teams                                                        crea un nuovo team
// DELETE /user/{userid}/teams/{teamid}                                             elimina un team
// PUT /user/{userid}/teams/{teamid}?action=add - remove                            aggiunge o rimuove un pokemon da uno specifico team


// ---------------------------------- FAVOURITES 
// GET /user/{userid}/favourites                                                    ritorna i pokemon preferiti
// PUT /user/{userid}/favourites?action=add - remove                                aggiunge o rimuove un pokemon dai preferiti

router.get('/user/:userid/teams',(req,res) => {
    let jwt = jsonwebtoken.verify(req.headers.authorization.replace("Bearer ", ""), process.env.JWT_SECRET);

    if(jwt['_id'] != req.params.userid) 
        return res.status(401).json({error: true, message:"No authorization to execute this endpoint"})

    return res.status(200).json()
})