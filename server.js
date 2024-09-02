import express from "express";
import cors from "cors";
import { createServer } from "http";
import { readFileSync } from "fs";

const options = {
    key: readFileSync("/app/tls/server.key"),
    cert: readFileSync("/app/tls/server.crt")
};

const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const httpsServer = createServer(app);

httpsServer.listen(5000);
