import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import upload from "./routes/upload.js";
import download from "./routes/download.js";
import cors from "cors";
import NewFile from "./events.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
app.use(express.json());
//app.use(cors({'Access-Control-Allow-Origin': "https://583d13e9-6176-4fb9-9932-25f41617cc0b-00-3qmz5lm97l5cb.kirk.replit.dev", 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Headers':'*'}));;
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  /*res.download(path.join(__dirname, "/example.csv"), "machin.csv", (err) => {
    if (err) {
      console.log(err);
    }
  });*/
  return res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use("/auth", auth);
app.use("/upload", upload);
app.use("/download", download);
app.use("*",(req, res, next)=>{
  console.log("garbage");
  return res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



function logger(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  next();
}

export {NewFile};
