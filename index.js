import express from "express"

const app=express();

app.get("/health",(req,res)=>{
    res.status(200).json({ "status": "ok" });
})

app.listen(8080,()=>{
    console.log("Server listening");
})