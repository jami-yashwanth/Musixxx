const jwt = require('jsonwebtoken');
const User = require('./models/User');

module.exports = async (req, res, next) => {
    const token = req.headers['token'];
    console.log("Token = ",token)
    if(!token) {
        return res.status(401).json({status:'error', error: 'access denied'})
    }

    try{
        const verified = jwt.verify(token, process.env.payloadString);
        req.user = verified;
        console.log("requesUser=",req.user);
        next();
    }
    catch(err){
        return res.status(401).json({status:'error', error: 'Invalid token'}) 
    }
}