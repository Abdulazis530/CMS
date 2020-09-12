
const fs = require('fs');
const path = require('path');
const DataDate = require('../models/DataDate');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cmsDb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), "utf-8")
);

DataDate.insertMany(data, (err,result) => {
    if (err) throw err;
    console.log(`${result.length} data has been imported`)
})