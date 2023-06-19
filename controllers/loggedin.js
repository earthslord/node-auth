const db = require("../routes/dbconfig");
const jwt = require("jsonwebtoken");//verify cookie

const loggedin = (req, res, next) => {
    if(!req.cookies.userRegistered) return next();
    // try catch for async function
    try{
        const dec = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id = ?', [dec.id], (err, result) =>{
            if(err) return next();
            req.user = result[0];
            return next();
        })

    }catch(err){
        if(err) return next();
    }
}
module.exports = loggedin;