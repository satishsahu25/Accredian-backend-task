const mysql = require("mysql2");
const bcrypt=require("bcrypt");

const dbconnect = mysql.createPool({
  host: "localhost",
  user: "root",
  password: null,
  database: "accredian",
});

const createNewUser = async(req, res) => {
  const { username, email, password } = req.body;


  const salt=await bcrypt.genSalt(10);
  const hashed= await bcrypt.hash(password,salt);



  var sql = "INSERT INTO userinfo SET ? ";
  let post = {
    username: username,
    email: email,
    password: hashed,
  };
  dbconnect.query(sql, post, (err, result) => {
    if (err) res.status(400).json(err);
    else{
      res.status(200).json({ data: result });
    }
  });
};


const loginuser = (req, res) => {
  const { email, password } = req.body;

  var sql =
    'SELECT email, password FROM userinfo WHERE email ="' + email + '"';
  dbconnect.query(sql, async(err, result) => {
    if (err) res.status(400).json(err);
    else {
      if (result.length!=0) {
      await bcrypt.compare(password,result[0].password,(err,comparison)=>{
          if(comparison){
            res.status(200).json({ data: result[0] });
          }else{
            res.status(400).json({msg:"Invalid credentials",err});
          }
        })
        
      } else {
        res.status(400).json("Invalid credentials entered");
      }
      // console.log(result);
    }
  });
};

module.exports = { createNewUser, loginuser };
