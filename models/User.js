const mongoose = require('mongoose')

const User = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    spotifyEmail : {
        type : String,
        // required : true,
        // unique : true
    },
    spotifyPassword : {
        type : String,
        // required : true
    },
    favs : {
        type : Array
    },
    customPlaylists : [{
        playlist : String,
        tracks : {type : Array}
    }]
},{
    collection : 'MusicApp'
})

const model = mongoose.model('userData',User)

module.exports = model