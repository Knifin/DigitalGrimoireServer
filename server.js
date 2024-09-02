import express from "express";
import cors from "cors";
import { createServer } from "https";
import { Server } from "socket.io";

const app = express();
const httpsServer = createServer(app);
const io = new Server(httpsServer);

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from the server!");
});

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

httpsServer.listen(5000);