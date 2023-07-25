const express=require("express");
const app=express();
const port=3000;
const weatherRouter = require("./routes/weather");


app.listen(port,()=>console.log("server started at port "+port));



app.use("/api", weatherRouter);