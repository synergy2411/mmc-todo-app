const express = require("express")
// const env = require("dotenv")
const cors = require("cors")
require("./db");
const TodoRouter = require("./routes/todos.routes")

const { sign, verify } = require("jsonwebtoken")

// env.config()
const app = express();
const PORT = process.env.PORT || 9000

app.use(cors())
app.use(express.json());

// Application level Middleware
// app.use(function(req, res, next){
//     console.log("Middleware")
//     next()
// })

app.post("/login", (req, res) => {
    if(req.body) { 
        const { username, password } = req.body
        // Verify the user from DB
        
        const token = sign({id : 123, role : "admin"}, "MY_SUPER_SECRET_KEY")
        return res.send({token})

    }
})

const ensureToken = (req, res, next) => {
    // console.log("Auth Header - ", req.headers.authorization)
    const authHeader = req.headers.authorization;
    if(authHeader != undefined){
        const token = authHeader.split(' ')[1]
        req.token = token;
        next()
    }else{
        return res.send({message : "Auth headers not present"})
    }
}

const verifyUser = async (req, res, next) => {
    try{
        const verified = await verify(req.token, "MY_SUPER_SECRET_KEY" )
        // Verify the ID from the DB
        next()
    }catch(err){
        return res.send({message : "Not authenticated"})
    }
}
// Protecting route/API
// Route Level Middleware
app.get("/user/profile", ensureToken, verifyUser, (req, res) => {
    return res.send({message : "showing profile"})
})


app.use("/todos", TodoRouter)

app.listen(PORT, () => { console.log("Server started at PORT : " + PORT)})
