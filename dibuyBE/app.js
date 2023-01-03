
import express from "express"
import { open } from "sqlite"
import sqlite3 from "sqlite3"
import cors from "cors"
import dotenv from "dotenv"
import { register, login, sendOtp, verifyOtp } from "./routes/Authentication/User.js"

const app = express();
dotenv.config()
app.use(cors())
app.use(express.json());
const dbPath = "/home/meesalasrinu/Desktop/projects/dibuy/dibuyBE/dibuy.db"
export let db;


console.log(process.env.jwtTokenSecretCode)
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        app.listen(4000, () => {
            console.log("Server Running at http://localhost:4000/");
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();


app.post("/user/register", register)
app.post("/user/login", login);
app.post("/user/sendotp", sendOtp)
app.post("/user/verifyotp", verifyOtp)




export default app;