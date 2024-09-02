import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://app.shinpostudios.com",
        methods: ["GET", "PUT"]
    }
});

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from the Server!");
});

httpServer.listen(5000);
