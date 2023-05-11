require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>console.log("connected to db"))
  .catch(console.error());

const Data = require("./models/PathData");

app.get('/list', async(req, res)=>{
    const datalist = await Data.find();
    res.json(datalist);
});

app.post('/create', async(req, res)=>{
    console.log("received data");
    console.log(req.body);
    const data = new Data(
        {
            phone : req.body.phone,
            qr : req.body.qr,
            location : {
                lon : req.body.longitude,
                lat : req.body.latitude
            }
        }
    );

    data.save();
    res.json(data);
});

app.delete('/delete/:uuid', async(req, res)=>{
    console.log(req.params);
    const result = await Data.findByIdAndDelete(req.params.uuid);
    res.json(result);
})


app.listen(PORT, ()=>console.log("server started on port "+PORT));

