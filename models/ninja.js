const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create geoschema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})
//create schema & model
const NinjaSchema = new Schema({
    name :{
        type: String
    },
    rank: {
        type: String
    },
    available:{
        type:Boolean,
        default:false
    },
    geometry: GeoSchema
})

const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja