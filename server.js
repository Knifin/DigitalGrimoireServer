import express from "express";
import cors from "cors";
import { createServer } from "https";
import { readFileSync } from "fs";

const options = {
    key: readFileSync("/app/tls/server.key"),
    cert: readFileSync("/app/tls/server.crt"),
    ca:
        [readFileSync("/app/tls/server.letsencrypt.crt")]
};

const app = express();
const httpsServer = createServer(options, app);
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

httpsServer.listen(5000);
