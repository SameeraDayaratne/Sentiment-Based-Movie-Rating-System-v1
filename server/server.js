const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  });

app.get("/api" , (req,res)=>{
    res.json({"users": ["userOne","userTwo","userThree"]});
})

app.listen(5000, ()=> console.log('Server strated on port 5000'));