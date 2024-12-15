import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import FormPermohonanRouter from "./routes/FormPermohonanRpute.js"


dotenv.config();
const app = express();


// (async () => {
//   await db.sync();
// })();



app.use(
    cors()
);


app.use(fileupload());
app.use(express.static("public"));
app.use(express.json());

app.use(FormPermohonanRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("server started", process.env.APP_PORT);
});