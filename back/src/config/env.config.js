import { loadEnvFile } from "process";

loadEnvFile();

export default {
    port: process.env.PORT,
    frontUrl: process.env.FRONT_URL,
    BackUrl: process.env.BACK_URL,

    mongoDB: process.env.MONGO,
    
    environment: process.env.ENVIRONMENT,
    
    userNodemailer: process.env.USERNODEMAILER,
    passNodemailer: process.env.PASSNODEMAILER,
    
    privateKeyPassport: process.env.PRIVATEKEYPASSPORT,
    jwtPrivateKey: process.env.JWTPRIVATEKEY,
    jwtPrivateRefresh: process.env.PRIVATEKEYREFRESH,
};