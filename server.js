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
    res.sendFile('/app/public/index.html');
});

app.get('/role/:roleId/lobby/:lobbyId', (req,res) => {
    res.sendFile('/app/public/index.html?roleId=' + req.params.roleId + '&lobbyId=' + req.params.lobbyId);
});

app.get('/style.css', (req,res) => {
    res.sendFile('/app/public/style.css');
});

httpServer.listen(process.env.PORT || 5000);
