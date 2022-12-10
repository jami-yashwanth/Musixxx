const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User') 
const verify = require('../verifyToken')

router.post('/register',async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const credentials = {
            username : req.body.username,
            password : hashedPassword,
            email : req.body.email,
            spotifyEmail : req.body.spotifyEmail,
            spotifyPassword : req.body.spotifyPassword
        }
        console.log('req=',req.body)
        await User.create(credentials)
        res.json({status : "ok"})
    }
    catch(err){
        res.json({status : 'err'})
    }
})

router.post('/login', async(req,res) => {
    try{
        console.log("reqBody=",req.body);
        const user = await User.findOne({email : req.body.email})
        console.log('user=',user)
        const isValidPassword = await bcrypt.compare(req.body.password,user.password)
        console.log("isvalid=",isValidPassword)
        if(isValidPassword){
            const token = jwt.sign({
                username : user.username,
                email : user.email
            },process.env.payloadString)
            console.log("Token = ",token)
            res.json({status : "ok",message : "Login succesfull !",token : token,spotifyEmail : user.spotifyEmail, spotifyPassword : user.spotifyPassword})
        }
        else{
            res.json({status : "err",message : "Invalid username or password !!!"})
        }
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
})

router.post('/addFavs',verify, async(req,res) => {
    try{
        await User.findOneAndUpdate(
            {username : req.user.username},
            {$addToSet : {favs : req.body}}
        )
        res.json({status : "ok"})
    }
    catch(err){
        res.json({status : "err"})
    }
}) 

router.post('/removeFavs',verify, async(req,res) => {
    console.log("id=",req.user)
    try{
        await User.findOneAndUpdate(
            {username : req.user.username},
            {$pull : {favs : {id : req.body.id}}}
        )
        res.json({status : "ok"})
    }
    catch(err){
        res.json({status : "err"})
    }
}) 

router.get('/getFavs',verify,async(req,res) => {
    const response = await User.find({username : req.user.username})
    res.json({status : "ok", favs : response[0].favs})
})


router.post('/createPlaylist',verify,async(req,res) => {
    // console.log("reqq=",req.body);
    const playlist = req.body.newPlaylist;
    const resp = await User.findOne(
        {username : req.user.username},
        )
        const data = resp.customPlaylists;
    var exists = false;
    data.map((item) => {
        if(item.playlist === playlist){
            exists = true
        }
    })
    if(!exists){
        try{
            await User.findOneAndUpdate(
                {username : req.user.username},
                {$addToSet : {customPlaylists : {playlist}}}  
            )
            res.json({status : "ok",message : "Added successfully!!"})
        }
        catch{
            res.json({status : "err",message : "error while adding!!"})
        }
    }
    else{
        res.json({status : "ok",message : "Playlist Already exists!!"})
    }
})

router.post('/deletePlaylist',verify,async (req,res) => {
    const playlist = req.body.playlist;
    const resp = await User.findOne(
        {username : req.user.username}
    )
    const data = resp.customPlaylists;
    // console.log("dataa=",data)
    const finalData = data.filter((item) => {
        return item.playlist !== playlist;
    })
    // console.log("data=",finalData);
    try{
        await User.findOneAndUpdate(
            {username : req.user.username},
            {$set : {customPlaylists : finalData}}
        )
        res.json({status : "ok"})
    }
    catch{
        res.json({status : "err"})
    }
})

router.post('/addTrackToPlaylist',verify,async(req,res) => {
    console.log("req=",req.user);
    const newTrack = req.body.track;
    const Playlist = req.body.playlist;
    const resp = await User.findOne(
        {username : req.user.username},
    )
    // console.log("responseee=",resp);
    const data = resp.customPlaylists;
    console.log("dat111a=",data)
    console.log("tras=",newTrack)
    data.map((item) => {
        if(item.playlist === Playlist){
            var exists = false;
            item.tracks.map((track) => {
                console.log("itt=",track.name)
                if(track.name === newTrack.name){
                    exists = true;
                }
            })
            if(!exists){
                item.tracks.push(newTrack)
            }
            else{
                console.log("hii");
                res.json({status : "ok",message : "Already added in Playlist !!"})
            }
        }
    })
    console.log("data=",data);
    await User.findOneAndUpdate(
        {username : req.user.username},
        {$set : {customPlaylists : data}}
    )
    res.json({status : "ok", message : "Added successfully!!"});
})

router.get("/getCustomPlaylists",verify,async (req,res) => {
    const resp = await User.findOne(
        {username : req.user.username},
    )
    res.json(resp.customPlaylists);
})

router.post("/removeFromPlaylist",verify,async (req,res) => {
    const playlist = req.body.playlist;
    const trackName = req.body.trackName;
    const resp = await User.findOne({username : req.user.username})
    // console.log("resp=",resp)
    // console.log ("playlieeeest=",req.body.playlist);
    const data = resp.customPlaylists;
    const k = data.map((item) => {
        const p = item.tracks;
        if(item.playlist === playlist){
            const p1 = p.filter((track) => {
                return track.name !== trackName;
            })
            item.tracks = p1;
        }
    })
    await User.findOneAndUpdate(
        {username : req.user.username},
        {$set : {customPlaylists : data}}
    )
    res.json({status : "ok"})
    // console.log("data=",data);
})


module.exports = router