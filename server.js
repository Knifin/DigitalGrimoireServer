import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

httpServer.listen(5000);
