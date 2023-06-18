const db = require("../routes/dbconfig");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    //wait for bcrypt
    const { email, password:Npassword } = req.body
    if(!email || !Npassword) return res.json({status: "error", error: "Please enter values for email and password"});
    else{
        console.log(email);
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) =>{
            if (err) throw err;
            if(result[0]) return res.json({ status: "error", error: "email has already been registered" })
            else{
                const hpassword = await bcrypt.hash(Npassword, 8);//hash entered password and enter email into table
                console.log(hpassword);
                db.query('INSERT INTO users SET ?', {email:email, password:hpassword}, (error, results) => {
                    if(error) throw error;
                    return res.json({status: "success", success:"registered successfully"});
                })
            }
        })
        // async for db.query subsequent interior branches do not require async
    }
}
module.exports = register;