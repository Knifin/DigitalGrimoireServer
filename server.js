import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { createServer } from "https";
import { Server } from "socket.io";

const app = express();

let options = {
    key: readFileSync('/app/tls/server.key'),
    cert: readFileSync('/app/tls/server.crt'),
};

const httpsServer = createServer(options, app);
const io = new Server(httpsServer);

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from the server!");
});

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to DigitalGrimoire Server');
})

app.listen(5000);