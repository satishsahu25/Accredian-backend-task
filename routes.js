const express=require('express');
const { createNewUser, loginuser } = require('./controller');
const router=express.Router();


router.post('/register',createNewUser);
router.post('/login',loginuser);


module.exports=router;