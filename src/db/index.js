const { connect } = require("mongoose")
const env = require("dotenv");

env.config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e9xsq.mongodb.net/mmc_db?retryWrites=true&w=majority`
const uri = `mongodb+srv://synergy2411:qpecY3JdC6XclgVP@cluster0.e9xsq.mongodb.net/mmc_db?retryWrites=true&w=majority`

// const uri = "mongodb://localhost:27017/mmc_db";

connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(response => {
        console.log("Mongo Connected...")
    })
    .catch(err => {
        console.log(err);
        process.exit(1)
    })