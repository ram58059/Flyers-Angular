const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');

const app = express();
// Load environment variables
const mongoURI = process.env.MONGODB_URI;
const corsOrigin = process.env.CORS_ORIGIN;
const port = process.env.PORT || 5000;

// CORS setup
app.use(cors({ origin: corsOrigin }));

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const docSchema = new mongoose.Schema ({
    name: String,
    detail: String,
    location: String,
    map: String,
    date: String,
    img:String,
    no: String
});
const doc1Schema = new mongoose.Schema ({
    name: String,
    detail: String,
    url: String,
    date: String,
    img: String,
    no: String
});

const gsignin = new mongoose.Schema ({
    username: String,
    email: String
});

const nsignin= new mongoose.Schema ({
    username: String,
    email: String,
    password: String
});

var Education = mongoose.model("Education", docSchema);
var Coding = mongoose.model('Coding', doc1Schema);
var Mepcoevent = mongoose.model("mepcoevent", docSchema);
var Sport = mongoose.model('sports', docSchema);
var Gregister = mongoose.model('gregister', gsignin);
var Nregister = mongoose.model('nregister', nsignin);

var msgE = {
    message: true,
    docList: []
};
var msgC = {
    message: true,
    docList: []
};
var msgM = {
    message: true,
    docList: []
};
var msgS = {
    message: true,
    docList: []
};
var msgr = {
    message: false,
    docList: []
}

var doc={
    message:true,
    name:'',
    detail:'',
    location:'',
    map:'',
    date:'',
    img:''
};

var doc2={
    message:true,
    name:'',
    detail:'',
    url:'',
    date:'',
    img:''
}

var guser={
    username:'',
    email: ''
}

var nuser = {
    username: '',
    email: '',
    password: ''
}

Education.find(function(err, educations){
    if(err) {
        console.log(err);
    } else {
        educations.forEach(function(education){
            msgE.docList.push(education);
        })
    }
});

Coding.find(function(err, codings){
    if(err) {
        console.log(err);
    } else {
        codings.forEach(function(coding){
            msgC.docList.push(coding);
        });
    }
});

Mepcoevent.find(function(err, mepcoevents){
    if(err) {
        console.log(err);
    } else {
        mepcoevents.forEach(function(event){
            msgM.docList.push(event);
        });
    }
});

Gregister.find(function(err, registers){
    if(err) {
        console.log(err);
    } else {
        registers.forEach(function(event){
            msgr.docList.push(event);
        });
    }
});

Nregister.find(function(err, registers){
    if(err) {
        console.log(err);
    } else {
        registers.forEach(function(event){
            msgr.docList.push(event);
        });
    }
});

Sport.find(function(err, sports){
    if(err) {
        console.log(err);
    } else {
        sports.forEach(function(sport){
            msgS.docList.push(sport);
        });
    }
});

app.get('/list', function(req,res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    var title = req.query.title;
    console.log(title);
    if(title === 'Education') {
        res.json(msgE);    
    } else if(title === 'Coding') {
        res.json(msgC);
    } else if(title === 'Mepcoevent') {
        res.json(msgM);
    } else if(title === 'Sport') {
        res.json(msgS);
    }
});

app.get('/insert', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    var title = req.query.title;
    if (typeof(req.query.location) === "undefined") {
        doc=doc2;
        doc.url = req.query.url;
    } else {
        doc.location = req.query.location;
        doc.map = req.query.map;
    }
    doc.name = req.query.name;
    doc.detail = req.query.detail;
    doc.date = req.query.date;
    doc.img = req.query.img;
    doc.no=req.query.no;
    console.log(req.query.title);
    if(title === "Education") {
        var l1 = new Education(doc);
        msgE.docList.push(doc);
    } else if(title === "Coding") {
        var l1 = new Coding(doc);
        msgC.docList.push(doc);
    } else if(title === "Mepcoevent") {
        var l1 = new Sport(doc);
        msgM.docList.push(doc);
    } else if(title === "Sport") {
        var l1 = new Sport(doc);
        msgS.docList.push(doc);
    }
    l1.save();
    console.log("Successfully inserted to events");
    res.json({message: true});
});

app.get('/update', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    var title=req.query.title;
    var name=req.query.name;
    var changename=req.query.changename;
    var changevalue=req.query.changevalue;
    console.log(name,changename,changevalue);
    var q='';
    if(changename==='name') {
        q={name:changevalue}
    } else if(changename==='detail') {
        q={detail:changevalue}
    } else if(changename==='location') {
        q={location:changevalue}
    } else if(changename==='map') {
        q={map:changevalue}
    } else if(changename==='date') {
        q={date:changevalue}
    } else if(changename==='img') {
        q={img:changevalue}
    } else if(changename ==='url')  {
        q={url:changevalue}
    }


    if(title === "Education") {
        Education.updateOne({name:name},q,function(err,res) {
            if(err) {
            console.log(err);
            } else {
                console.log('****');
                msgE.docList.forEach(function(data) {
                    if (name === data['name']) {
                        data[changename]=changevalue;
                    }
                });
                console.log(res.modifiedCount)
            }
        });
    } else if(title === "Coding") {
        Coding.updateOne({name:name},q,function(err,res) {
            if(err) {
            console.log(err);
            } else {
                console.log('****');
                msgC.docList.forEach(function(data) {
                    if (name === data['name']) {
                        data[changename]=changevalue;
                    }
                });
                console.log(res.modifiedCount)
            }
        });
    } else if(title === "Mepcoevent") {
        Mepcoevent.updateOne({name:name},q,function(err,res) {
            if(err) {
            console.log(err);
            } else {
                msgM.docList.forEach(function(data) {
                    if (name === data['name']) {
                        data[changename]=changevalue;
                    }
                });
                console.log(res.modifiedCount)
            }
        });
    } else if(title === "Sport") {
        Sport.updateOne({name:name},q,function(err,res) {
            if(err) {
            console.log(err);
            } else {
                console.log('****');
                msgS.docList.forEach(function(data) {
                    if (name === data['name']) {
                        data[changename]=changevalue;
                    }
                });
                console.log(res.modifiedCount)
            }
        });
    }
    res.json({message:true});
});

app.get('/delete', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    var title = req.query.title;
    var name = req.query.name;
    if(title === "Education") {
        var i = msgE.docList.indexOf(name);
        msgE.docList.splice(i,1);
        Education.deleteOne({name: name}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Successfully deleted');
            }
        });
    } else if(title === "Coding") {
        var i = msgC.docList.indexOf(name);
        msgC.docList.splice(i,1);
        Coding.deleteOne({name: name}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Successfully deleted');
            }
        });
    } else if(title === "Mepcoevent") {
        var i = msgM.docList.indexOf(name);
        msgM.docList.splice(i,1);
        Mepcoevent.deleteOne({name: name}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Successfully deleted');
            }
        });
    } else if(title === "Sport") {
        var i = msgS.docList.indexOf(name);
        msgS.docList.splice(i,1);
        Sport.deleteOne({name: name}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Successfully deleted');
            }
        });
    }
    res.json({message: true});
});

app.get('/loginuser', function(req,res) {
    console.log('login called');
    const email = req.query.email;
    const password = req.query.password;

    var temp={};
    msgr.message=false;

    msgr.docList.forEach(function(data) {
        if(data.email === email) {
            if(data.password === password) {
                msgr.message = true;
                temp = data;
            }
        }
    });
    res.json({message: msgr.message, username: temp.username});

});

app.get('/insertuser', function(req, res) {
    console.log('sign up called');
    nuser.username=req.query.username;
    nuser.email=req.query.email;
    nuser.password=req.query.password;

    let userExist = false;
    let temp = {};

    msgr.docList.forEach(function(data) {
        if(data.email === nuser.email && data.password === nuser.password) {
            userExist = true;
            temp = data;
        }
    });
    if (userExist) {
        res.json({message: false, username: temp.username});
    } else {
        var u = new Nregister(nuser);
        u.save();
        msgr.docList.push(nuser);
        res.json({message: true, username: nuser.username});
    }
});

app.get('/loginguser', function(req, res) {
    console.log('google login called');
    guser.username=req.query.username;
    guser.email=req.query.email;

    var temp={};
    msgr.message=false;

    msgr.docList.forEach(function(data) {
        if(data.email === guser.email && data.username === guser.username) {
            msgr.message = true;
            temp = data;
        }
    });
    res.json({message: msgr.message, username: temp.username});

})

app.get('/insertguser', function(req, res) {
    console.log('google sign up called');
    guser.username=req.query.username;
    guser.email=req.query.email;

    let userExist = false;
    let temp = {};

    msgr.docList.forEach(function(data) {
        if(data.email === guser.email && data.username === guser.username) {
            userExist = true;
            temp = data;
        }
    });
    if (userExist) {
        res.json({message: false, username: temp.username});
    } else {
        var u = new Gregister(guser);
        u.save();
        msgr.docList.push(guser);
        res.json({message: true, username: guser.username});
    }
})

if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function(req, res) {
    console.log('server started successfully');
});
