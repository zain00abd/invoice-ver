const express = require("express")
const mongoose = require('mongoose');
const moment = require('moment');
const index = express();
const port = process.env.PORT || 8080;
let day = moment().format('D/M/Y');
let ocloke = moment().format('LT');
const dataS = require('./models/datashcema');
var methodOverride = require("method-override")

index.use(methodOverride("_method"))
index.use(express.static("public"));
index.use(express.urlencoded({ extended: true }));
index.set("view engine", "ejs");

// get requst
index.get('/', (req, res) => {

    dataS.find()
        .then((result) => {
            res.render("index", { arr: result });

        })
        .catch((error) => {
            console.error(error);
        });
});



index.get('/adduser', (req, res) => {
    res.render("AllPage/adduser.ejs", {})
})

index.get('/view/:id', (req, res) => {
    dataS.findById(req.params.id)
    .then((result) =>{

        res.render("AllPage/view.ejs", { arr: result })
    })
    .catch((err) =>{
        console.log(err)
    })
    
});

index.put('/edit/:id', (req, res) => {
    dataS.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>{
        res.redirect("/");
    })
    .catch((err) =>{
        console.log(err)
    })
    console.log(req.body)
});


index.get('/info/:id', (req, res) => {
    dataS.findById(req.params.id)
    .then((result) =>{

        res.render("AllPage/addinvoice.ejs", { user: result })
        
    })
    .catch((err) =>{
        console.log(err)
    })

})

index.delete('/delet/:id',(req,res) =>{
    dataS.findByIdAndDelete(req.params.id)
    .then(() =>{
        res.redirect("/")

    })
    .catch((err) =>{
        console.log(err)
    })
})

// post requst
index.post("/adduser", (req,res) =>{

    dataS.create(req.body)
    .then((newuser) =>{
        res.redirect(`/view/${newuser._id}`)
    })
    .catch((err) =>{
    })

})


index.post('/search', (req, res) => {
    const searchtext = req.body.textsearch
    dataS.find({$or: [{ name:searchtext }, { addres:searchtext }]})
        .then((result) => {
            res.render("AllPage/search.ejs",{user: result, textsearch:searchtext});
            console.log(result)
        })
        .catch((error) => {
            console.error(error);
        });
});




mongoose.connect("mongodb+srv://zaindiv:SK7A2fOZbLeJ08Ix@cluster0.32r5dqe.mongodb.net/all-data?retryWrites=true&w=majority")
    .then(() => {
        index.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    })
    .catch(() => {

    })