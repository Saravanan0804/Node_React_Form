const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();


app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use(cors());

app.get("/", ()=>{
    resizeBy.send('Welcome to my forma');
});

app.post("/api/forma" ,(req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail' ,
        port:465,
        auth:{
            user:'*************',
            pass:'********',
        },
    });
    
let mailOptions={
    from:data.email,
    to:'**********',
    subject:`Message from ${data.name}`,
    html:`

    <h3>Information</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Lastname: ${data.lastname}</li>
    <li>Email: ${data.email}</li>
    </ul>

    <h3>Message</h3>
    <p>${data.message}</p>
    `
};

smtpTransport.sendMail(mailOptions, (error,response) => {

    if(error){
        res.send(error);
    }
    else{
        res.send('Success');
    }
});

smtpTransport.close();

});

const PORT = process.env.PORT||3001;
app.listen(PORT, ()=>{
    console.log(`server starting at ${PORT}`);
});