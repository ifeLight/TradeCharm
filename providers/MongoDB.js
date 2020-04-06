const config = require('config');
const mongoose = require('mongoose')

const connectionUri = config.get('db.uri');
mongoose.connect(process.env.MONGO_CONNECTION, { autoIndex: false, useNewUrlParser: true , });

mongoose.connection.on("connected", function () {
    console.log(" Mongo Database Connected");
})

mongoose.connection.on("disconnected", function () {
    console.log(" Mongo Database Disconnected...");
    console.log("Exiting, because of mongoose no connection");
    process.exit(0);
})

mongoose.connection.on("error", function (err) {
    console.error("An error occured with Mongo DB Connection");
    console.error(err);
    process.exit();
})

process.on("SIGINT", function () {
    console.log(" Closing Mongo Database ....");
    mongoose.connection.close(function (err) {
        if (err) console.error(err);
        if (!err) {
            console.log("Mongo Database now Closed");
            process.exit(0);
        }
    })
})


module.exports  = mongoose;