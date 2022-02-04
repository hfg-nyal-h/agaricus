require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

/* const dbUri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
 */
const dbUri =
  "mongodb+srv://DatabaseChef:qGyMeJ73Jl5FBcbd@cluster0.jntzv.mongodb.net/moistureTracking?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const dbClient = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dataCollecion;
let sensorCollection;

let sessions = {
  test: {
    test: "test",
  },
};

dbClient.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    dataCollecion = dbClient
      .db("moistureTracking")
      .collection("moisture");

    console.log("connected to mongodb moisture");
    sensorCollection = dbClient
    .db("moistureTracking")
    .collection("sensorData");
    console.log("connected to mongodb SensorData");

  }
});

const mqtt = require("mqtt");
const moistureTopic = process.env.MQTT_MOIS_TOPIC;
const mqttId = uuidv4();
const mqttClient = mqtt.connect(process.env.MQTT_HOST, { clientId: mqttId });

mqttClient.on("connect", function () {
  mqttClient.subscribe(moistureTopic, function (err) {
    if (err) {
      console.log(err);
    } else {
      //Hier muss ich den Sensorname und die SensorId aus der Datenbank holen
      mqttClient.publish(moistureTopic + "logs/", mqttId + " connected");
      console.log("subscribed to " + moistureTopic);
    }
  });
});

/* Moisture */
mqttClient.on("message", function (moistureTopic, message) {
  // console.log(JSON.parse(message));
  if (dataCollecion) {
    let msg = JSON.parse(message);
    date = new Date()
    msg.createdAt = now();
    msg.modifiedAt = now();
    //msg.day = day();


    dataCollecion.insertOne(msg);
    console.log(msg);
  }
});


const express = require("express");
//const axios = require('axios');
const app = express();
const port = process.env.MOISTURE_SERVICE_PORT;
const cors = require("cors");
/*  const corsOptions = {
  origin: "http://localhost:8080"

};  */
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Trockenobst (joyful app)!");
});

let dataarray = [];
let sensorArray = [];

app.post("/api/sensorData/", (req, res) => {
  let username = req.body.storage.username;
 /*  console.log(req.body.range)
  console.log(req.body) */
  let available;
  range = Number(req.body.range);

/* Hier Spezifisch bei find nach User und Type suchen */
  sensorCollection
    .find({ user: username})
    .toArray()
    .then((available) => {
      let zwischenarray = [];
      available.forEach((element) => {
        zwischenarray.push(element);
      });

      for (let index = 0; index < zwischenarray.length; index++) {
        const element = zwischenarray[index];

        dataCollecion
          .find({ sensorId: element._id })
          .limit(range)
          .sort({ createdAt: -1 })
          .toArray(function (err, result) {
            if (result.length != 0) {
              dataarray.push(result);
            } else {
              dataarray.push([
                {
                  sensorId: element.sensorId,
                  sensorUser: element.sensorUser,
                  moisture: "--",
                  createdAt: "--",
                  modifiedAt: "--",
                },
              ]);
            }
            if (dataarray.length === zwischenarray.length) {
              res.send(dataarray);
              dataarray = [];
            }
          });
      }
    });
});

app.post("/api/dhtData/", (req, res,) => {
  let username = req.body.storage.username;
  console.log(username);
  console.log(req.body.range)
  console.log(req.body)
  let type = "Moisture and DHT"
  let range = Number(req.body.range);
  //
  //let type = "Moisture"
  let available;
/* Hier Spezifisch bei find nach User und Type suchen */
  sensorCollection
    .find({ sensorType: type})
    .toArray()
    .then((available) => {
      let zwischenarray = [];
      available.forEach((element) => {
        zwischenarray.push(element);
          console.log(element);
          //console.log(" :element");
      });
      console.log(zwischenarray)
      //console.log(" :zwischenarray");

      for (let index = 0; index < zwischenarray.length; index++) {
        console.log(index + " index")
        const element = zwischenarray[index];
        console.log(element)
        let dataarray = [];
        let placeholder = {
          sensorId: element.sensorId,
          sensorUser: element.sensorUser,
          moisture: 2, 
          humidity: 2,
          temperature: 2,
          createdAt: '2022-2-2 02:02:02',
          modifiedAt: '2022-2-2 02:02:02',
        };

         dataCollecion
          .find({ sensorId: element._id })
          .limit(range)
          .sort({ createdAt: -1 })
          .toArray(function (err, result) {
            if (result.length != 0) {
              dataarray.push(result);
            } else {
              console.log("Has no value")
              dataarray.push(placeholder);
            }
            //dataarray = [];
            if (dataarray.length === zwischenarray.length) {
              console.log(dataarray)
              console.log(" :dataarray")
              res.send(dataarray);
            }
          }); 
      }
    });
});



app.get("/api/sensorData/searchSensor/", (req, res) => {
  let sensorData = {
    user: null
  }
  sensorCollection
    .find({ user: sensorData.user })
    .toArray()
    .then((available) => {
      if(available){
        res.status(200).send(available);
        console.log(available)
        } else {
          console.log("failed")
        }
    });
});

app.post("/api/sensorData/create/", (req, res) => {
  let sensorData = req.body;
  console.log(sensorData + " value of SensorData");

  sensorData.user = sensorData.user;
  sensorData.createdAt = now();
  sensorData.modifiedAt = now();
  sensorData._id = uuidv4();
  sensorData.sentData = "";
  sensorData.averangeValue = "";
  console.log(sensorData);

    sensorCollection.insertOne(sensorData, (dbErr) => {
      if (dbErr) {
        console.log(dbErr);
        res.status(500).send({
          message: "database error",
        });
        console.log("inserted Sensordata into database");
        res.status(201).send({
          message: "inserted Sensordata into database",
        });
    } else {
    res.status(500).send({
      message: "not connected to database",
    });
  }
});
});

app.post("/api/sensorInformation/", (req, res) => {
  let username = req.body.username;
  sensorCollection
    .find({ user: username })
    .toArray()
    .then((available) => {
      res.send(available);
    });
});


app.post("/api/editSensor/", (req, res) => {
  let sensorData = req.body;
  console.log(sensorData.sensorName + " value of sensorData in dataservice")
  let myquery = {
  _id: sensorData.sensorId,
  };
  let newvalues = {
      $set: {
          sensorName: sensorData.sensorName,
          sensorType: sensorData.sensorType,
          modifiedAt: now(),
      },
  }

sensorCollection
  .updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
});
});

app.post("/api/deleteSensor/", (req, res) => {
  let sensorData = req.body;
  console.log(sensorData.sensorId + " value of sensorData in dataservice")
  let myquery = {
  _id: sensorData.sensorId,
  };



sensorCollection
  .deleteOne(myquery)
});

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


function day(){
  let date = new Date();
  year = date.getFullYear();
  month = date.getMonth()+1;
  dt = date.getDate();
  return (year+'-' + month + '-' + dt);
}
