import express from "express";
import cors from "cors";
import { createServer } from "https";
import { Server } from "socket.io";
import { readFileSync } from "fs";

const options = {
    key: readFileSync("/app/tls/server.key"),
    cert: readFileSync("/app/tls/server.crt")
};

const app = express();
const httpsServer = createServer(options, app);
const io = new Server(httpsServer);

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from the server!");
});

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

httpsServer.listen(5000);