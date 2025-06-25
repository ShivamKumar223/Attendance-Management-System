let express = require("express");
let path = require("path");
// let {Client} = require("pg");

let app = express();

app.use(express.urlencoded({extended : false}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.listen(4000,()=>console.log("Server started"));