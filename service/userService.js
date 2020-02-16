const express = require('express');
const router = express.Router();
const user = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/createUser', async (req, res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try{
        const payload = new user({
            userName: req.body.userName,
            password: hashedPassword
        });
        const response = await payload.save();
        res.json(response);
    }catch(err){
        res.json(err);
    }
});

router.get('/users', async(req, res)=>{
    try{
        const response = await user.find();
        res.json(response);
    }catch(err){
        res.json(err);
    }
});

router.post('/', async(req, res)=>{
    try{
        const data = await user.findOne({userName: req.body.userName});
        if(!data){
            return res.status(400).send("Invalid userName");
        }
        let legitUser = await bcrypt.compare(req.body.password, data.password);
        if(!legitUser){
            return res.status(400).send("Invalid Password");
        }
        let token = jwt.sign({name: req.body.userName}, process.env.SECRET_TOKEN);
        res.header({'auth-token': token});
        res.status(200).send('Logged In!!!!');
    }catch(err){
        res.json(err);
    }
});

module.exports = router;