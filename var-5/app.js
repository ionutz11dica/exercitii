const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// - If no request body is present you should return a json with the following format: `{message: "Body is missing"}`. Response status code should be: `500`;
// - If the request body properties are missing you should return a json with the following format: `{message: "Invlid body format"}`. Response status code should be: `500`;
// - Product price should be positive, otherwise return a json with the following format: `{message: "Price should be a positive number"}`. Response status code should be: `500`; 
// - If the product already exists in the array. Return a json with the following format: `{message: "Product already exists"}`.Response status code should be: `500`;
// - If the request body is good, product should be added in the array and return a json with the following format: `{message: "Created"}`.Response status code should be: `201`;

app.use(bodyParser.json());
app.use(cors());

app.locals.products = [
    {
        name: "Iphone XS",
        category: "Smartphone",
        price: 5000
    },
    {
        name: "Samsung Galaxy S10",
        category: "Smartphone",
        price: 3000
    },
    {
        name: "Huawei Mate 20 Pro",
        category: "Smartphone",
        price: 3500
    }
];

app.get('/products', (req, res) => {
    res.status(200).json(app.locals.products);
});

app.post('/products', (req, res, next) => {
    
    if(Object.keys(req.body).length==0){
        res.status(500).json({message: 'Body is missing'});
    }if(req.body.price <0){
        res.status(500).json({message: 'Price should be a positive number'});
    }
    for(let i = 0 ;i < app.locals.products.length;i++){
        if(req.body.name == app.locals.products[i].name){
            res.status(500).json({message: 'Product already exists'});
        }
    }
    if(Object.keys(req.body).length==3){
        app.locals.products.push(req.body)
        app.locals.products.splice(4,5)
        res.status(201).json({message: 'Created'});
    }
    
     if(Object.keys(app.locals.products[0]).includes(Object.keys(req.body))){
        
     }else{
          res.status(500).json({message: 'Invalid body format'});
     }
   res.status(400).json({message: 'Bad request'});
})

module.exports = app;