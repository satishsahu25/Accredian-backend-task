require('dotenv').config();
const express=require('express');
const app = express();
const router = require('./routes');
const cors=require('cors');
const port =process.env.PORT|| 5000;

app.use(express.json());
app.use(cors());

app.use('/api',router);


app.listen(port,()=>{

    console.log(`listening on ${port}`);
});