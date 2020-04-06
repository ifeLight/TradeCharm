const mongoose  = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Types = mongoose.Schema.Types;

const config = require('config');

var addressSchema = mongoose.Schema({
    
},
{ timestamps: { createdAt: 'created_at', updatedAt : "updated_at" }
})

//addressSchema.plugin(mongoosePaginate);


module.exports = address;




