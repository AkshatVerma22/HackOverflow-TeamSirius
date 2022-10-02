const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const bodyParser = require('body-parser')
const app = express();
const md5 = require("md5");
const ContactUs = require('./models/contactUs');
const contact = require('./models/contact');

const staticpath = path.join(__dirname, "./public");

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(staticpath));
app.set('view engine', 'hbs');
app.set("views", "views");


// database connection
mongoose.connect("mongodb://localhost/siriusLogin", ()=>{
    console.log("Database connected");
})


// Pages

///////////////////  Get ///////////////

app.get("/", (req, res)=>{
    res.render("main");
})

app.get("/register", (req, res)=>{
    res.render("register")
})

app.get("/login", (req, res)=>{
    res.render("login");
})


app.get("/contact", (req, res)=>{
    res.render("contact")
})

app.get("/chat", (req, res)=>{
    res.render("chatbot");
})

app.get('/partner', (req, res)=>{
    res.render("partner")
})

app.get('/forum', (req, res)=>{
    res.render('forum')
})

app.get('/forumthread', (req, res)=>{
    res.render('forumthread')
})

///////////// Post //////////////

app.post("/process-contact-form", async (req, res)=>{
    const newUser = new contact({
                email: req.body.email,
                password: md5(req.body.password)
            });
        
            newUser.save(function(err){
                if (err){
                    console.log(err);
                } else{
                    res.render("contact");
                }
            });
})

app.post("/contact-form", (req, res)=>{
    const newMessage = new ContactUs({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    newMessage.save(function(err){
        if(err){
            console.log(err);
        } else{
            // alert('Thanks for contacting. Our team will reach you soon')
            res.render("main");
        }
    });
})


app.post("/login", (req, res)=>{
    const email = req.body.email;
    const password = md5(req.body.password);

    contact.findOne({email: email}, function(err, foundUser){
        if (err){
            console.log(err);
        } else{
            if (foundUser) {
                if (foundUser.password === password) {

                    res.render("contact")
                }
            }
        }
    });

})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Sever started");
})