import { v4 as uuidv4 } from "uuid"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import { db } from "../../app.js";

let otpsList = []

export const register = async (request, response) => {
    const { name, email, mobile, password, location, gender } = request.body;
    const userId = uuidv4()
    const validatingUserQuery = `SELECT * FROM users WHERE email='${email}';`;
    const userFound = await db.get(validatingUserQuery);
    //if matched atleast one row returned else undefined.
    if (userFound === undefined) {
        if (password.length < 8) {
            response.status(400);
            response.send({ msg: `Password is too short` });
        } else {
            const encPswd = await bcrypt.hash(password, 10);
            const addUserQuery = `INSERT INTO users (id,email, name, password, gender, location,mobile) VALUES('${userId}','${email}','${name}','${encPswd}','${gender}','${location}',${mobile});`;
            const userRegisteredId = await db.run(addUserQuery);
            response.status(200);
            response.send({ msg: `User Registered successfully` });
        }
    } else {
        response.status(400);
        response.send({ msg: "User already exists" });
    }

}


export const login = async (request, response) => {

    console.log("/login route is accessed")
    const { email, password } = request.body;
    const emailVerifyQuery = `SELECT * FROM users WHERE email='${email}'`;
    const verifyUser = await db.get(emailVerifyQuery);
    if (verifyUser === undefined) {
        response.status(400);
        response.send({ msg: "User Not Found" });
    } else {
        const comparePswd = await bcrypt.compare(password, verifyUser.password);
        if (comparePswd) {
            response.status(200);
            response.send({ msg: "Login success!" });
        } else {
            response.status(400);
            response.send({ msg: "Invalid password" });
        }
    }



}



//use app password in google security tab in googel mangage account settings


export const sendOtp = async (request, response) => {
    const { UserEmail } = request.body
    const digits = "0123456789"
    const otpSize = 6
    let generatedOtp = ""
    for (let i = 0; i < otpSize; i++) {
        generatedOtp += digits[Math.floor(Math.random() * 10)]
    }

    // async..await is not allowed in global scope, must use a wrapper
    async function sendOtpByNodemailer() {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "dibuyindia@gmail.com", // generated ethereal user
                pass: "ypbxrkdkchrzkxwj", // generated ethereal password
            },
        });

        const htmlCode = `<div><h5>Hello Dear Customer.Your One Time Password is</h5><h1>${generatedOtp}</h1><p>Please donot share the password with anyone.</p><p>Your OTP get expired in next 10 minute.</p><br><br><br><b><i>Thanks&regards:<br>Dibuy<br>RGUKT Srikakulam<br>Andhra Pradesh</i></b><p><b>Happing Shopping-RadheRadhe</b></p><img src='cid:krishna' width='100%'/></div> `;

        const options = {
            from: 'dibuyindia@gmail.com', // sender address
            to: UserEmail, // list of receivers
            subject: "Login Attempt", // Subject line
            text: "Say with me 'RadheRadhe'", // plain text body
            html: htmlCode,
            attachments: [
                { filename: "Krishna", path: "https://img.freepik.com/free-vector/happy-janmashtami-with-lord-krishna-hand-playing-bansuri-card-background_1035-24230.jpg?w=740&t=st=1671865848~exp=1671866448~hmac=f28c31eed3076b30c1077f501a4fa9dc25c836a8f495f51332c845b84f522862", cid: "krishna" }
            ]
        }

        // send mail with defined transport object
        let info = await transporter.sendMail(options, (error, info) => {
            if (error) {
                // console.log(error)
                response.status(400)
                response.send({ msg: "Something Went Wrong" })

            } else {
                console.log("OTP generated")
                response.send({ msg: "OTP successfully sent" })
                const otpId = uuidv4()
                otpsList.push({ UserEmail, generatedOtp, id: otpId })
                console.log(otpsList)
                setTimeout(() => {
                    const updatedList = otpsList.filter(obj => obj.id !== otpId)
                    otpsList = updatedList
                    console.log(otpsList)
                }, 600000)
            }
        });
    }


    sendOtpByNodemailer();

}

export const verifyOtp = async (request, response) => {
    const { receivedOtp, UserEmail } = request.body
    console.log(request.body)
    const isValidOtp = (otpsList.filter(obj => obj.generatedOtp === receivedOtp && obj.UserEmail === UserEmail)).length === 1
    if (isValidOtp) {
        response.status(200)
        response.send({ msg: "Login success" })

    } else {
        response.status(400)
        response.send({ msg: "Invalid Otp" })

    }
}