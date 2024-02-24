const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ModelSchema = new Schema({
    name:String,
    addres:String,
    phone:String,
    invoicesprice:Number,
    invoicespay:Number,
    latsarr:Number,
    arrinvoce:[Object],



})

const data = mongoose.model("invoce",ModelSchema)
module.exports = data