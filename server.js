import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
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

httpServer.listen(process.env.PORT || 5000);
