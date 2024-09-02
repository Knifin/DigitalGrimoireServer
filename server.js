// import { createServer } from "http";
import { createServer } from "https";
import { readFileSync } from "fs";
import { Server } from "socket.io";

const httpServer = createServer({
  key: readFileSync("/app/tls/server.key"),
  cert: readFileSync("/app/tls/server.crt"),
  ca: readFileSync("/app/tls/server.letsencrypt.crt"),
  rejectUnauthorized: false
});

// const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
        origin: "https://app.shinpostudios.com",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from joinapp.shinpostudios.com!");
  
    socket.on('player-join', (lobbyId,playerId,name,pronouns,role) => {
        if (lobbyId !== '') {
            console.log(lobbyId,playerId,name,pronouns,role);
            socket.to(lobbyId).emit('player-join-info', {lobbyId,playerId,name,pronouns,role});
        }
    });
    
    socket.on('join-lobby', lobbyId => {
        socket.join(lobbyId);
    });
    
    socket.on('report-resolution', (height,width) => {
       console.log(height,width);
    });
    
    socket.on('show-player', (playerId, role) => {
        console.log('show-player', playerId, role);
        socket.to(playerId).emit('get-role', role);
    });
});

httpServer.listen(5000);
