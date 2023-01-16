import express from "express"
import connectToRemoteDb from "./databaseConnections/AtlasDbConnection.js";
import User from "./models/users.js"
import authenticationRoute from "./routes/Authentication.js";

const port = 4000
const app = express()

app.listen(port, () => { console.log("Server running Successfully") })
connectToRemoteDb()

app.use(express.json())
app.use(authenticationRoute)