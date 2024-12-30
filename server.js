const express = require('express');
const morgan = require('morgan');
const app = express();

let total = 0 ;

// MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//Routes 

app.get('/',(req, res)=>{
    const name = req.query.name;
    const age = req.query.aqe;
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
    // res.send('Sevrer is running!')
});

app.get('/greetings', (req, res)=>{
   

    res.send(`<h1>Hello there</h1>`)
        
});
app.get('/shoes', (req, res)=>{
    const shoesType=req.query.type;
    const max=parseFloat(req.query.max);
    const min=parseFloat(req.query.min);
    let data = []
    // if (shoesType!=="" && min >0 && max >0)
    //      data=shoes.filter((i)=>{return ((i.price >= min && i.price <= max && i.type===shoesType));})
    queries = req.query

    if (['type','min','max']  in queries ){
        data=shoes.filter((i)=>{return ((i.price >= min && i.type===shoesType && i.price <= max));})
    }
    else if (['type','min']  in queries)
        data=shoes.filter((i)=>{return ((i.price >= min && i.type===shoesType));})
    
    else if (['type','max']  in queries)
        data=shoes.filter((i)=>{return (( i.price <= max && i.type===shoesType));})
    else if (['type']  in queries)
        data=shoes.filter((i)=>{return ((i.type===shoesType));})
    else if (['max']  in queries)
        data=shoes.filter((i)=>{return ( i.price <= max);})
    else if (['min']  in queries)
        data=shoes.filter((i)=>{return (i.price > min );})
    
    if(data.length === 0 && queries.length ===0)
        res.send("no shoes with the chosen filters");
    if(queries.length !== 0 && data.length > 0){
        res.send(data)
    }
    else {
        res.send(shoes);
    }
});


app.get('/roll/:number',(req,res)=>{
    const num = parseInt(req.params.number);
    if (num > 0){
        res.send(`You rolled a ${num}`);
    }else{
        res.send(`please enter a valid number not, ${req.params.number}`)
    }
});

app.get('/collectibles/:indexId',(req,res)=>{
    const idxId = req.params.indexId;
    if (idxId < collectibles.length){
        const item = collectibles[idxId]
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }else{
        res.send(`This item is not yet in stock. Check back soon!`)
    }
});


app.get('/greetings/:userName', (req, res)=>{
    // const userName = req.params.userName;
    
    res.send(`<h1>Hello there,${req.params.userName}!</h1>`)
    res.send(`<h2>What a delight it is to see you once more,${req.params.userName}!</h2>`)
    
        
});

app.listen('3000');