
const { Schema, model } = require("mongoose")

// Schema

const todoSchema = new Schema({
    label : {
        type : String,
        required : [true, "Label is mandatory for todo item"]
    },
    status : {
        type : Boolean,
        default : false
    },
    amount : {
        type : Number,
        required : [true, "Amount is required for todo item "],
        // min : [100, "Too low expense"]
        validate : {
            validator : value => {
                return value > 100
            },
            message : "Validator Fn - Too low value"
        }
    }
})

// todoSchema.pre("validate", () => {console.log("Pre - validate")})
// todoSchema.post("validate", () => {console.log("Post - validate")})
// todoSchema.pre("save", () => {console.log("Pre - save")})
// todoSchema.post("save", () => {console.log("Post - save")})

// Model - Collection in DB

const TodoModel = model("Todo", todoSchema)

module.exports = TodoModel;

// Todo - todos

// ES6 Module - import and export - babel configuration