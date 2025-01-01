const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json()); // Fix: Added parentheses
app.use(express.urlencoded({ extended: true })); // Fix: Added parentheses
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/', function (req, res) {
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files: files});
    });
 // Ensure 'views/index.ejs' exists
});

app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err,filedata){
        res.render('show',{filename: req.params.filename, filedata: filedata});
    })
});

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){
        res.redirect('/')
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
