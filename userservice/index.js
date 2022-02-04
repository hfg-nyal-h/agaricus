// .
// .
// Constants
// .
// .
require('dotenv').config();
//const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userMiddleware = require('./middleware/users.js');

      /* include Mongo DB */
      //const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/moistureTracking?retryWrites=true&w=majority`;
      const dbUri = "mongodb+srv://DatabaseChef:qGyMeJ73Jl5FBcbd@cluster0.jntzv.mongodb.net/moistureTracking?retryWrites=true&w=majority";
      const { MongoClient } = require('mongodb');
      const dbClient = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
      dbClient.connect(err => {
        if (err) {
          console.log(err);
        }
        else {
          userCollection = dbClient.db("moistureTracking").collection("users");
          console.log("connected to mongodb");
        }
      });

            /* Include Express */
            const express = require('express');
            const app = express();
            const port = process.env.USER_SERVICE_PORT;
            const cors = require('cors');
            /* const corsOptions = {
              origin: "http://localhost:8080",
            }; */
            const corsOptions = {
              origin: "*",
            };

// .
// .
// Variables 
// .
// .

let userCollection;
let sessions = [];


// .
// .
// Logic 
// .
// .


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connect to Localhost */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/* Get Information from Localhost */
app.get('/', (req, res) => {
  res.send('Welcome to User Service of Trockenobst');
});

/* Register an Account
-> Type Username and Password
Check if Valid
Check if Input is correct
Hash Password and delete old one
Put Account into MongoDB Database */
app.post('/api/register',userMiddleware.validateRegister, (req, res) => {
  console.log("someone is trying to register.");
  let userData = req.body;
  userCollection.findOne({ username: userData.username })
    .then((dbres) => {
      if (dbres) {
        //Do this when username was found in databse
        res.status(400).send({
          message: "user does exist"
        });
      }
      else {
      // DO this when username not found in database
              
              const hash = bcrypt.hashSync(userData.password, saltRounds);
              delete userData.password;
              userData.hashedPass = hash;
              userData.createdAt = now();
              userData.modifiedAt = now();
              console.log(userData);
              
              if (userData) {
                userCollection.insertOne(userData, (dbErr) => {
                  if (dbErr) {
                    console.log(dbErr);
                    res.status(500).send({
                      message: "database error"
                    });
                  }
                  else {
                    console.log("inserted user data into database");
                    res.status(201).send({
                      message: "inserted user data into database"
                    });
                  }
                })
              }
              else {
                res.status(500).send({
                  message: "not connected to database"
                });
                }

      }
    });
});

/* Login with a registered account
-> Type Username and Password
Check if username and password match
encrypt hashed password
create a new session with token*/
app.post('/api/login', (req, res) => {
  console.log("someone is trying to login.");
  let sentData = req.body;
  userCollection.findOne({ username: sentData.username })
    .then((dbres) => {
      if (dbres) {
        if (bcrypt.compareSync(sentData.password, dbres.hashedPass)) {
          const session = createSession(dbres);
          //const session = createSession(dbres._id);
          res.status(200).send(session);
          console.log(sessions);
        }
        else {
          // wrong password
          res.status(400).send({
            message: "wrong password"
          });
        };
      }
      else {
        // username not found in database
        res.status(400).send({
          message: "user doesn't exist"
        });
      
      }
     }); 
});



/* Check if Token is valid */

/*  app.post('/api/validateToken', (req, res) => {
  console.log("processing sent token for validation");
  let sentToken = req.body.token;
    res.status(200).send({
      tokenIsValid: sessions.hasOwnProperty(sentToken)
    });
});  */

/*   app.post('/api/validateToken', (req, res) => {
  console.log('processing sent token for Valdiation')
  let sendToken = req.body.token;

  if (sessions.hasOwnProperty(sendToken)) {
    console.log("session exists");
    res.status(200).send({
      tokenIsValid: true
    });
  } else {
    console.log("session doesnt exist")
    res.status(400).send({
      tokenIsValid: false
    });
  } 
  }) */


 app.get('/api/users', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData + "req.userData von SecretRout");
  res.send('This is the secret content. Only logged in users can see that!');
}); 

// .
// .
// Functions
// .
// .

function checkToken(token) {
  console.log(token)
  try {
    if (sessions.hasOwnProperty(token)) {
    console.log("Token Valid");
    return true

  } else {
    console.log("Token not valid")
    return false
  }
  } catch (error) {
    
  }
}


function createSession(userid) {
  //const token = uuidv4();
  const token = jwt.sign({
    username: userid.username,
    myusername: userid.username,
    userId: userid._id
  },
     'SECRETKEY', {
    expiresIn: '7d'
  })
 
const date = now()

  const session = {
    token: token,
    createdAt: date,
    modifiedAt: date,
    userId: userid,
  };

  sessions[token] = session;
  return session;
}

function now(){
  let date = new Date();
  year = date.getFullYear();
  month = date.getMonth()+1;
  dt = date.getDate();
  h = date.getHours()
  min = ((date.getMinutes()<10?'0':'') + date.getMinutes())
  sec = ((date.getSeconds()<10?'0':'') + date.getSeconds())
  return (year+'-' + month + '-' + dt +" "+   h +":" +min+":" +sec);
  }

