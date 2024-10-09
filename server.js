import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "PUT"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from the Server!");

    socket.on('player-join', (lobbyId,playerId,name,pronouns,role) => {
        if (lobbyId !== '') {
            socket.to(lobbyId).emit('player-join-info', {playerId,name,pronouns,role});
        }
    });

    socket.on('join-lobby', (lobbyId) => {
        socket.join(lobbyId);
    });
});

app.get('/', (req,res) => {
    res.sendFile('/app/public/index.html');
});

app.get('/index.html', (req,res) => {
    res.sendFile('/app/public/index.html');
});

app.get('/style.css', (req,res) => {
    res.sendFile('/app/public/style.css');
});

httpServer.listen(process.env.PORT || 5000);
