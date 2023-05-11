const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PathDataSchema = new schema({
    phone : {
        type : String,
        required: true
    },
    qr : {
        type: String
    },
    location : {
        lon : {type : String},
        lat : {type : String}
    },
    timestamp : {
        type : String,
        default: Date.now()
    }
})

const DriverData = mongoose.model("Driver Data", PathDataSchema);
module.exports = DriverData;