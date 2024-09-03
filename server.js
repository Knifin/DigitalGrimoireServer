import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "PUT"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from the Server!");
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

httpServer.listen(process.env.PORT || 5000);
