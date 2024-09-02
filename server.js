// import { createServer } from "http";
import { createServer } from "https";
import { readFileSync } from "fs";
import { Server } from "socket.io";

// const httpServer = createServer();

const httpServer = createServer({
  key: readFileSync("/app/tls/server.key"),
  cert: readFileSync("/app/tls/server.crt")
});

const io = new Server(httpServer, {
  cors: {
        origin: "https://app.shinpostudios.com",
        methods: ["GET"]
  }
});

io.on("connection", (socket) => {
    socket.emit("hello", "Hello World from joinapp.shinpostudios.com!");
});

httpServer.listen(5000);
