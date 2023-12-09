const db=require("./db");

const Usermodel=function(userdata){
    this.firstname=userdata.firstname;
    this.email=userdata.email;
    this.password=userdata.password;
}


Usermodel.createNewUser=(result)=>{
    db.query("INSERT INTO userdata SET ?",userdata,(err,res)=>{
        if(err){
            console.log("error in connecting to db",err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

module.exports=Usermodel;