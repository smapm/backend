const express = require('express');
const router = express.Router();
const movie = require('../model/movieSchema');
const auth = require('../authentication');

router.post('/', async (req, res)=>{   
    try{
        const request = new movie({
            name: req.body.name,
            genre: req.body.genre,
            description: req.body.description
        });
        const response = await request.save();
        res.json(response);
    }catch(err){
        res.json(err);
    }
});

router.get('/', auth, async (req, res)=>{
    try{
        const response = await movie.find();
        res.json(response);
        //console.log(res.userName);
    }catch(err){
        res.json(err);
    }
});

router.get('/:id', async (req,res)=>{
    try{
        const response = await movie.findOne({_id: req.params.id});
        res.json(response);
    }catch(err){
        res.json(err);
    }
});

router.delete('/:id', async (req,res)=>{
    try{
        const response = await
        movie.remove({_id: req.params.id});
        res.json(response);
    }catch(err){
        res.json(err);
    }
});

router.patch('/:id', async (req, res)=>{
    try{
        const update = await movie.updateOne({_id: req.params.id}, {$set: {name: req.body.name}});
        res.json(update);
    }catch(err){
        res.json(err);
    }
})

module.exports = router;